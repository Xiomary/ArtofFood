const express = require('express');
const router = express.Router();
// Import Rating model
const Rating = require('../../models/ratingModel');
// Import Recipe model
const Recipe = require('../../models/recipeModel');

// POST route to add a rating to a recipe
router.post('/add/:recipeId', async (req, res) => {
  const { username, score } = req.body;
  const { recipeId } = req.params;

  try {
    // Check if the recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // If the recipe exists, create a new rating
    const newRating = await Rating.create({ username, score, recipeId });
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
