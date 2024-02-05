import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import recipe card
import RecipeCard from './recipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/recipe/recipes')
      .then(res => {
        setRecipes(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <h2>Recipe List</h2>
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
