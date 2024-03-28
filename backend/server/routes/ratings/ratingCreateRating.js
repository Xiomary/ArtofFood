const express = require('express');
const router = express.Router();
// Import Rating model
const Rating = require('../../models/ratingModel');
// Import Recipe model
const Recipe = require('../../models/recipeModel');
// In the POST route handler to add a rating to a recipe
router.post('/add/:recipeId', async (req, res) => {
  const { score } = req.body;
  const { recipeId } = req.params;

  // Extract userId from the logged-in user's token or session
  const { userId } = req.body; // Modify this line to properly extract userId

  try {
    // Check if this specific user has already rated this specific recipe
    let userRating = await Rating.findOne({ userId: userId, recipeId: recipeId });

    // If a rating by this user for this recipe exists, prevent a new rating
    if (userRating) {
      return res.status(409).json({ message: 'User has already rated this recipe' });
    }

    // Create a new rating because it doesn't exist for this user and recipe
    const newRating = new Rating({ userId, score, recipeId });
    await newRating.save();

    return res.status(201).json({ message: 'Rating added successfully', rating: newRating });
  } catch (error) {
    console.error(error); // Better logging for debugging
    return res.status(500).json({ message: 'Server error', error: error.toString() });
  }
});

module.exports = router;
