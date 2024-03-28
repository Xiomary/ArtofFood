const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    // Remove unique: true from here
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, {
  collection: "ratings",
  // Add timestamps or any other options needed
});

// Define a compound unique index on userId and recipeId
ratingSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);



