const express = require("express");
const router = express.Router();
const Comment = require("../../models/commentModel");

router.delete("/comments/delete/:id", async (req, res) => {
    try {
      const commentId = req.params.id;
      
      const comment = await Comment.findById(commentId);
      // Check if comment exists
      if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
      }
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment." });
    }
  });

module.exports = router;
