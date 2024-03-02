const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeModel");

// Endpoint to add a rating to a recipe
router.post("/recipes/:recipeId/rate", async (req, res) => {
    const { recipeId } = req.params;
    const { username, score } = req.body;

    if (score < 1 || score > 5) {
        return res.status(400).send("Score must be between 1 and 5.");
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send("Recipe not found.");
        }

        // Add the new rating
        recipe.ratings.push({ username, score });

        await recipe.save();
        res.status(201).send("Rating added successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
