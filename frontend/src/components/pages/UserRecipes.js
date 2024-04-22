import React, { useEffect, useState } from "react";
import axios from "axios";


const OwnerRecipes = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwnerRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/recipes/owner/${userId}`);
        setRecipes(response.data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching owner's recipes:", error);
        setError("Failed to load owner's recipes.");
        setLoading(false);
      }
    };

    fetchOwnerRecipes();
  }, [userId]);

  return (
    <div>
      <h2>Owner's Recipes</h2>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && recipes.length === 0 && <div>No recipes found.</div>}
     
    </div>
  );
};

export default OwnerRecipes;
