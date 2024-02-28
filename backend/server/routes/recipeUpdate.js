const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel'); // Adjust the path to your Recipe model

// GET route to fetch the recipe to be updated
router.get('/recipes/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// PUT route to update the recipe
router.put('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // This option returns the document after update
    );
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
