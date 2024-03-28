import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import SearchComponent from "./SearchComponent";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Initialize as empty array

  useEffect(() => {
    axios.get("http://localhost:8081/recipe/getAll")
      .then((res) => {
        setRecipes(res.data);
        setFilteredRecipes(res.data); // Initialize filteredRecipes with all recipes
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Fetch average ratings for all recipes
    const fetchAverageRatings = async () => {
      try {
        const ratingsPromises = recipes.map(recipe =>
          axios.get(`http://localhost:8081/ratings/average/${recipe._id}`)
        );
        const ratingsResponses = await Promise.all(ratingsPromises);
        const averageRatingsData = ratingsResponses.reduce((acc, res, index) => {
          acc[recipes[index]._id] = res.data.averageRating;
          return acc;
        }, {});
        setAverageRatings(averageRatingsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAverageRatings();
  }, [recipes]);

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
        {filteredRecipes.map((recipe) => ( // Use filteredRecipes instead of recipes
          <RecipeCard key={recipe._id} recipe={recipe} averageRating={averageRatings[recipe._id]} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
