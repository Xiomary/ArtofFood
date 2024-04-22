const express = require("express");
const router = express.Router();
const newUserModel = require("../../models/userModel");

// GET /getUserById/:userId
// Get user by ID
router.get("/getUserById/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await newUserModel.findById(userId).select('username');
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
