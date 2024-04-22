const mongoose = require("mongoose");
const Comment = require("./commentModel");


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
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  labels: { 
    type: [String],
    required: false, 
  },
});

// Create a model from the recipe schema
const Recipe = mongoose.model("Recipe", recipeSchema);

// Export the Recipe model
module.exports = Recipe;
