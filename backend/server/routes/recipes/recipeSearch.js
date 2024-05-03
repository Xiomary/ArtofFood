const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipeModel');

router.get('/recipes/search', async (req, res) => {
  
  try {
    const { query } = req.query;
    const searchQuery = {};

    if (query && query.trim()) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },        // Search in title
        { ingredients: { $regex: query, $options: 'i' } },  // Search in ingredients
        { cuisineType: { $regex: query, $options: 'i' } }   // Search in cuisineType
      ];
    }

    const recipes = await Recipe.find(searchQuery);
    res.json({ success: true, recipes });
  } catch (err) {
    console.error('Error searching for recipes:', err);
    res.status(500).json({ success: false, message: 'Failed to search for recipes' });
  }
});

module.exports = router;
