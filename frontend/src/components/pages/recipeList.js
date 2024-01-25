// recipeList.js
import React, { useState, useEffect } from 'react';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:8081/recipe/recipes');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
            setIsLoading(false);
        };

        fetchRecipes();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <h2>{recipe.title}</h2>
                        <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                        <p>Instructions: {recipe.instructions.join(' -> ')}</p>
                        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} style={{ maxWidth: '100%' }} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
