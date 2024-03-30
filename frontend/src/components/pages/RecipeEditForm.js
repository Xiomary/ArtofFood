import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeEditForm = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null); // State to hold the uploaded image file

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/recipe/${id}`);
        setRecipeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to fetch recipe. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions || !recipeData.cuisineType || !image) {
        setError('Please fill out all fields and upload an image.');
        return;
      }

      const formData = new FormData(); // Create a FormData object
      formData.append('image', image); // Append the image file to the FormData object
      formData.append('title', recipeData.title);
      formData.append('ingredients', recipeData.ingredients);
      formData.append('instructions', recipeData.instructions);
      formData.append('cuisineType', recipeData.cuisineType);
      formData.append('userId', recipeData.userId);

      await axios.put(`http://localhost:8081/recipe/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error updating recipe:', error);
      setError('Failed to update recipe.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="form-control" name="title" value={recipeData.title} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <input type="text" className="form-control" name="ingredients" value={recipeData.ingredients} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea className="form-control" name="instructions" value={recipeData.instructions} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Cuisine Type:</label>
          <input type="text" className="form-control" name="cuisineType" value={recipeData.cuisineType} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Recipe updated successfully.</div>}
        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  );
};

export default RecipeEditForm;
