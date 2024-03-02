const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipe = require("../models/recipeModel");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto'); // Import crypto

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Get AWS S3 configuration from environment variables
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// Configure AWS S3 client
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// Function to generate a random string
const generateRandomString = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');

router.post("/add", upload.single("image"), async (req, res) => {
  console.log("Add recipe");

  const { title, ingredients, instructions, cuisineType, userId } = req.body; // Destructure text fields from req.body
  const { file } = req; // Destructure file from req.file

  try {
    // First, upload the image to S3 if there is an image
    let imageUrl = "";
    if (file) {
      // Use generateRandomString function to create a unique file name
      const uniqueFileName = generateRandomString() + "-" + file.originalname;

      const uploadParams = {
        Bucket: bucketName,
        Key: uniqueFileName, // Use the unique file name
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      await s3.send(new PutObjectCommand(uploadParams));
      imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;
    }

    // Create a new recipe object with the image URL
    const recipeData = {
      title,
      ingredients,
      instructions,
      cuisineType,
      userId,
      imageUrl,
    };
    const recipe = new Recipe(recipeData);

    // save recipe to database
    await recipe.save();
    console.log("Recipe saved", recipe);
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error saving recipe", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
