const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipeModel'); 

// Get all recipes
router.get('/getAll', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;