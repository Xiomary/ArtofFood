const mongoose = require("mongoose");

// User schema/model
const commentSchema = new mongoose.Schema(
  {
    // Username of the commenter
    username: {
      type: String,
      required: true,
      label: "username",
    },
    // Content of the comment
    comment: {
      type: String,
      required: true,
      label: "comment",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "comments" }
);

module.exports = mongoose.model('comments', commentSchema);