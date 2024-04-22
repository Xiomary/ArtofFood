const express = require("express");
const router = express.Router(); 
const Rating = require("../../models/ratingModel");

router.get('/checkUserRating/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const { userId } = req.query; 
  
    try {
      const userRating = await Rating.findOne({ userId: userId, recipeId: recipeId });
      if (userRating) {
        return res.status(200).json({ hasRated: true });
      } else {
        return res.status(200).json({ hasRated: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.toString() });
    }
  });
  

  module.exports = router;