const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Ensuring username is always provided
    label: "username",
  },

  recipeId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Recipe',
  },
  
  score: {
    type: Number,
    required: true, // Corrected to ensure a score is always provided
    min: 1,
    max: 5,
  },
}, {
  collection: "ratings" // Corrected syntax here
});

module.exports = mongoose.model('ratings', ratingSchema);
