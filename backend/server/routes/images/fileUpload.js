// s3UploadMiddleware.js

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
const multer = require("multer");

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const generateRandomString = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');

// Middleware for uploading files to S3
const s3Upload = upload.single('image');

const s3UploadMiddleware = async (req, res, next) => {
  s3Upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (req.file) {
      const uniqueFileName = generateRandomString() + "-" + req.file.originalname;
      const uploadParams = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      try {
        await s3.send(new PutObjectCommand(uploadParams));
        req.imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;
        next();
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }
    } else {
      next(); // Proceed without doing anything if no file is attached
    }
  });
};

module.exports = s3UploadMiddleware;
