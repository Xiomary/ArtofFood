const express = require("express");
const router = express.Router();

//import user model
const newUserModel = require('../../models/userModel');

router.get('/getProfile/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Check if userId is undefined or empty   
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      const user = await newUserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.json({
        user: {
          userId: user._id,  
          name: user.name,
          bio: user.bio,
          imageUrl: user.imageUrl
          
        }
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
 
module.exports = router;
