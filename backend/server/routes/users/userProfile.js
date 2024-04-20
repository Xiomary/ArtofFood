const express = require("express");
const router = express.Router();
const newUserModel = require('../../models/userModel');
const s3UploadMiddleware = require('../../routes/images/fileUpload'); 

router.post('/profile', s3UploadMiddleware, async (req, res) => {
  const { userId, name, bio } = req.body;
  let imageUrl = req.imageUrl || ""; 

  try {
    const user = await newUserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user properties if provided
    user.name = name || user.name; // Only update if provided
    user.bio = bio || user.bio; // Only update if provided
    user.imageUrl = imageUrl; // Save image URL

    await user.save();

    return res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
