const express = require("express");
const router = express.Router();
const Rating = require("../../models/ratingModel");

router.post("/add/:recipeId", async (req, res) => {
  const { score } = req.body;
  const { recipeId } = req.params;

  // Extract userId from the logged-in user's token or session
  const { userId } = req.body;

  try {
    let userRating = await Rating.findOne({
      userId: userId,
      recipeId: recipeId,
    });
    if (userRating) {
      return res
        .status(409)
        .json({ message: "User has already rated this recipe" });
    }

    const newRating = new Rating({ userId, score, recipeId });
    await newRating.save();

    return res
      .status(201)
      .json({ message: "Rating added successfully", rating: newRating });
  } catch (error) {
    console.error(error); 
    return res
      .status(500)
      .json({ message: "Server error", error: error.toString() });
  }
});

module.exports = router;
