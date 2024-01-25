const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel'); 

// Delete a recipe by ID
router.delete('/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  try {
    // Check if the recipe with the given ID exists
    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Delete the recipe
    await Recipe.findByIdAndRemove(recipeId);

    res.status(204).json(); // No content (recipe deleted successfully)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
