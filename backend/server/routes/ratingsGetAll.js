// Assuming you have an endpoint to fetch a recipe by its ID
router.get("/recipes/:recipeId", async (req, res) => {
    const { recipeId } = req.params;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send("Recipe not found.");
        }

        // Calculate the average rating
        const averageRating = recipe.ratings.reduce((acc, curr) => acc + curr.score, 0) / recipe.ratings.length;

        res.json({
            ...recipe.toObject(),
            averageRating: averageRating.toFixed(2) // Format to 2 decimal places
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
