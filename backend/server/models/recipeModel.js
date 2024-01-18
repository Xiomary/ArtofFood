const mongoose = require('mongoose');
const commentSchema = require('./comment'); // Importing the comment schema from another js file 

// Defining the schema for recipes
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,    // Type of the title field is String
    required: true   // The title field is required
  },
  ingredients: {
    type: [String],  // Type of the ingredients field is an array of Strings
    required: true   // The ingredients field is required
  },
  instructions: {
    type: String,    // Type of the instructions field is String
    required: true   // The instructions field is required
  },
  imageUrl: {
    type: String,    // Type of the imageUrl field is String
    required: true   // The imageUrl field is required
  },
  comments: [commentSchema] // Embedding the comment schema here, so each recipe can have its own comments
});

// Creating a model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Exporting the model to be used in other parts of the application
module.exports = Recipe;
