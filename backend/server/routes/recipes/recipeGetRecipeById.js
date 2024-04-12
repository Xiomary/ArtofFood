const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipeModel'); // Adjust the path as necessary

// GET route to fetch a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;