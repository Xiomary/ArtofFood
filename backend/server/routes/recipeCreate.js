const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel');

router.post('/add', async (req, res) => {
  console.log('Add recipe');
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    console.log('Recipe saved', recipe); 
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error saving recipe', error); 
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
