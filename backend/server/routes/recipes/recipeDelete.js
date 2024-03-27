// Existing imports and router setup
const express = require("express");
const router = express.Router();
// Other imports like multer, Recipe model, etc.
//import Recipe model
const Recipe = require("../../models/recipeModel");
// DELETE route to delete a recipe by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params; // Extract the recipe ID from request parameters

  try {
    // Attempt to find and delete the recipe from the database
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    // If no recipe was found with the given ID, return a 404 Not Found response
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // If a recipe was successfully deleted, return a success response
    res.status(200).json({ message: "Recipe deleted successfully", deletedRecipe: deletedRecipe });
  } catch (error) {
    // If an error occurs, log it and return a 500 Internal Server Error response
    console.error("Error deleting recipe", error);
    res.status(500).json({ error: error.message });
  }
});

// Export the router
module.exports = router;
