const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const multer = require("multer");

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateRandomString = (bytes = 16) =>
  crypto.randomBytes(bytes).toString("hex");

// Middleware for uploading files to S3
const s3Upload = upload.single("image");

const s3UploadMiddleware = async (req, res, next) => {
  s3Upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (req.file) {
      const existingFileName = req.body.existingImageKey || generateRandomString() + "-" + req.file.originalname;
      
      const uploadParams = {
        Bucket: bucketName, 
        Key: existingFileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      try {
        // Optionally delete old file if there's an existing file key and it's a different file
        if (req.body.existingImageKey && req.body.existingImageKey !== existingFileName) {
          const deleteParams = {
            Bucket: bucketName,
            Key: req.body.existingImageKey,
          };
          await s3.send(new DeleteObjectCommand(deleteParams));
        }

        await s3.send(new PutObjectCommand(uploadParams));
        req.imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(existingFileName)}`;
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
