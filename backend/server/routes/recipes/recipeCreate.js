const express = require("express");
const router = express.Router();
const Recipe = require("../../models/recipeModel");
const s3UploadMiddleware = require('../../routes/images/fileUpload');

router.post("/add", s3UploadMiddleware, async (req, res) => {
  const { title, ingredients, instructions, cuisineType, userId } = req.body;
  let imageUrl = req.imageUrl || ""; 

  try {
    const recipeData = { title, ingredients, instructions, cuisineType, userId, imageUrl };
    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error saving recipe", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
