const express = require("express");
const router = express.Router();
const newUserModel = require("../../models/userModel");

// GET all users
router.get("/getAll", async (req, res) => {
  // Fetch all users from the newUserModel collection
  const user = await newUserModel.find();
  // Return the users as a JSON response
  return res.json(user);
});

module.exports = router;
