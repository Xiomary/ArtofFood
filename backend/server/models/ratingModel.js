const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});


const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
