const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel'); 

// Create a new recipe
router.post('/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
