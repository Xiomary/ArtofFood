const express = require("express");
const router = express.Router();
const Rating = require("../../models/ratingModel");

router.get("/getAll", async (req, res) => {
  const rating = await Rating.find();
  return res.json(rating);
});

module.exports = router;
