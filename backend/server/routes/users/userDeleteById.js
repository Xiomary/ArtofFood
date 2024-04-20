const express = require("express");
const router = express.Router();
const newUserModel = require('../../models/userModel');

// DELETE /users/:userId
// Delete a single user by ID
router.delete('/deleteUserById/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the logged-in user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only admins can delete users' });
    }

    const deletedUser = await newUserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
