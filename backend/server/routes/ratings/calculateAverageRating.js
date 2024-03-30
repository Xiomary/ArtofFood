const express = require("express");
const router = express.Router(); // Create a new router instance
const Rating = require("../../models/ratingModel");

// Route to calculate average rating for a recipe
router.get("/average/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    
    // Find all ratings for the recipe
    const ratings = await Rating.find({ recipeId });
    
    // Calculate average rating
    const totalRating = ratings.reduce((acc, rating) => acc + rating.score, 0);
    const averageRating = totalRating / ratings.length;
    
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error calculating average rating:", error);
    res.status(500).json({ error: "Failed to calculate average rating." });
  }
});

module.exports = router; 
