const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../../models/commentModel"); 

router.post("/addComment/:id", async (req, res) => {
  const { content } = req.body; 
  const { userId } = req.body; 

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
    res
      .status(400)
      .send({
        message: "Error trying to create comment",
        error: error.message,
      });
  }
});

module.exports = router;
