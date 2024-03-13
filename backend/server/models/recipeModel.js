const mongoose = require("mongoose");
const Comment = require("./commentModel"); // Import the comment model


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
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  // Add a user reference to associate the recipe with a user
  userId: {
    type : mongoose.Schema.Types.ObjectId, ref: 'users',
    required: true,
    label: 'userId',
  },
  comments: [Comment.schema], 

});

// Create a model from the recipe schema
const Recipe = mongoose.model("Recipe", recipeSchema);

// Export the Recipe model
module.exports = Recipe;
