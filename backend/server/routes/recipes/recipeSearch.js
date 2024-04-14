const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipeModel'); 

router.get('/recipes/search', async (req, res) => {
  try {
    const { title, ingredients, cuisineType } = req.query;


    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search for recipe title
    }

    if (ingredients) {
      const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
      query.ingredients = { $all: ingredientsArray };
    }

    if (cuisineType) {
      query.cuisineType = cuisineType; 
    }

    const recipes = await Recipe.find(query);

    res.json({ success: true, recipes });
  } catch (err) {
    console.error('Error searching for recipes:', err);
    res.status(500).json({ success: false, message: 'Failed to search for recipes' });
  }
});

module.exports = router;
