const mongoose = require("mongoose");
const Comment = require("./commentModel"); // Import the comment model
const Rating = require("./ratingModel"); // Import the rating model

// Define the recipe schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  cuisineType: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // Add a user reference to associate the recipe with a user
  userId: {
    type : mongoose.Schema.Types.ObjectId, ref: 'users',
    required: true,
    label: 'userId',
  },
  comments: [Comment.schema], 
  ratings: [Rating.schema], // Embed the rating schema
});

// Create a model from the recipe schema
const Recipe = mongoose.model("Recipe", recipeSchema);

// Export the Recipe model
module.exports = Recipe;
