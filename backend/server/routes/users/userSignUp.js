const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { newUserValidation } = require('../../models/userValidator');
const newUserModel = require('../../models/userModel');

router.post('/signup', async (req, res) => {
    const { error } = newUserValidation(req.body);
    if (error) return res.status(400).send({ message: error.errors[0].message });

    const { username, email, password, isAdmin } = req.body; // Include isAdmin in the destructuring

    // Check if username already exists
    const existingUser = await newUserModel.findOne({ username: username });
    if (existingUser)
        return res.status(409).send({ message: "Username is taken, pick another" });

    // Generates the hash
    const salt = await bcrypt.genSalt(10);
    // Parse the generated hash into the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creates a new user
    const newUser = new newUserModel({
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin,
    });

    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }
});

module.exports = router;
