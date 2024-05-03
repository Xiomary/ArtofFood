import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import SearchComponent from "./SearchComponent";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});

  // Function to fetch recipes
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/getAll`
      );
      setRecipes(res.data);
      fetchAverageRatings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to fetch average ratings
  const fetchAverageRatings = async (recipesData) => {
    try {
      const ratingsPromises = recipesData.map((recipe) =>
        axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/ratings/average/${recipe._id}`
        )
      );
      const ratingsResponses = await Promise.all(ratingsPromises);
      const averageRatingsData = ratingsResponses.reduce((acc, res, index) => {
        acc[recipesData[index]._id] = res.data.averageRating;
        return acc;
      }, {});
      setAverageRatings(averageRatingsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to handle search
  const handleSearch = async (filteredRecipes) => {
    setRecipes(filteredRecipes);
    fetchAverageRatings(filteredRecipes);
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            averageRating={averageRatings[recipe._id]}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
