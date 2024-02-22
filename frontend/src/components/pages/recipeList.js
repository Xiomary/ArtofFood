import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./recipeCard";
//import search component
import SearchComponent from "./searchComponent";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/recipe/recipes")
      .then((res) => {
        setRecipes(res.data);
        setFilteredRecipes(res.data); // Initialize filtered recipes with all recipes
      })
      .catch((err) => console.error(err));
  }, []);

  
// Function to handle search
const handleSearch = (query) => {
  // Filter recipes based on the search query in title or cuisineType
  const filtered = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query.toLowerCase()) ||
    (recipe.cuisineType && recipe.cuisineType.toLowerCase().includes(query.toLowerCase()))
  );
  setFilteredRecipes(filtered);
};


  return (
    <div>
      <SearchComponent onSearch={handleSearch} /> 
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
