const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel'); 

// Edit (update) a recipe by ID
router.put('/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const updateData = req.body; // Data to update the recipe

  try {
    // Check if the recipe with the given ID exists
    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Update the recipe
    await Recipe.findByIdAndUpdate(recipeId, updateData, { new: true });

    res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
