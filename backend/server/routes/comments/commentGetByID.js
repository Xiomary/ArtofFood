const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../../models/commentModel"); 

// Add route for fetching comments by recipe ID
router.get("/:recipeId/comments", async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    // Find all comments that belong to the specified recipe ID
    const comments = await Comment.find({ recipeId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
});

router.post("/addComment/:id", async (req, res) => {
  const { content, userId } = req.body;
  const recipeId = req.params.id;

  const newComment = new Comment({
    userId,
    recipeId,
    content,
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).send(savedComment);
  } catch (error) {
    res.status(400).send({
      message: "Error trying to create comment",
      error: error.message,
    });
  }
});

module.exports = router;
