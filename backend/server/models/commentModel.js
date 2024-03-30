const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Comment schema
const commentSchema = new Schema({
  // The ID of the user who is leaving the comment
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users', 
    required: true
  },
  // The ID of the recipe the comment is for
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    // Remove unique: true from here
  },
  // The text content of the comment
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true // Removes leading and trailing whitespace
  },

}, { timestamps: true });

// Compile and export the model
module.exports = mongoose.model('Comment', commentSchema);
