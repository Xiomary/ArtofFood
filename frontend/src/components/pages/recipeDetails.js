import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // Grab the id from the URL

  useEffect(() => {
    // Fetch recipe data
    axios
      .get(`http://localhost:8081/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
        // Fetch user data after recipe data is fetched
        if (response.data && response.data.userId) {
          fetchUser(response.data.userId);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the recipe data:", error);
        setError("Failed to load recipe data.");
        setLoading(false);
      });
  }, [id]);

  // Function to fetch user data
  const fetchUser = (userId) => {
    axios
      .get(`http://localhost:8081/user/getUserById/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data:", error);
        setError("Failed to load user data.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  // Render recipe details and user information
  return (
    <div>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <h4>Created by: {user ? user.username : "Unknown User"}</h4> {/* Display username */}
      <h4>Ingredients:</h4>
      <p>{recipe.ingredients}</p>
      <h4>Cuisine Type:</h4>
      <p>{recipe.cuisineType}</p>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
