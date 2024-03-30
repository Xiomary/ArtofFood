// Import necessary modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipe = require("../../models/recipeModel");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto'); // Import crypto

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Get AWS S3 configuration from environment variables

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

// Route to update a recipe
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const recipeId = req.params.id;
  const { title, ingredients, instructions, cuisineType, userId } = req.body;
  const { file } = req;

  try {
    let imageUrl = "";
    if (file) {
      const uniqueFileName = generateRandomString() + "-" + file.originalname;
      const uploadParams = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      await s3.send(new PutObjectCommand(uploadParams));
      imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`;
    }

    const updatedRecipeData = {
      title,
      ingredients,
      instructions,
      cuisineType,
      userId,
      imageUrl,
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedRecipeData, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    
    console.log("Recipe updated:", updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
