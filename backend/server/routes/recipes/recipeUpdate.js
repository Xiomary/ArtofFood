// Import necessary modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipe = require("../../models/recipeModel");
const s3UploadMiddleware = require('../../routes/images/fileUpload');

// Route to update a recipe
router.put("/update/:id", s3UploadMiddleware, async (req, res) => { // Use the S3 upload middleware here
  const recipeId = req.params.id;
  const { title, ingredients, instructions, cuisineType, userId } = req.body;
  const imageUrl = req.imageUrl; // Get the imageUrl from the request

  try {
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
