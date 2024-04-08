const mongoose = require("mongoose");

// User schema/model
const newUserSchema = new mongoose.Schema(
  {
    // Username of the user 
    username: {
      type: String,
      required: true,
      label: "username",
    },
    // User's email
    email: {
      type: String,
      required: true,
      label: "email",
    },
    // User's password
    password: {
      required: true,
      type: String,
      min: 8
    },
    imageUrl: {
      type: String,
      required: false,
    },
   
    bio: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema);
