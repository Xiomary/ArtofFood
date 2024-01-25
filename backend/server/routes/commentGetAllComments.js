const express = require("express");
const router = express.Router();
const commentModel = require("../models/commentModel");

// GET /comment/getAll
// Retrieve all comments
router.get("/getAll", async (req, res) => {
  const comments = await commentModel.find();
  return res.json(comments);
});

module.exports = router;