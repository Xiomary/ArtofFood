// Import React, useState, useEffect, useRef
import React, { useState, useEffect, useRef } from "react";
// Import axios and useParams
import axios from "axios";
import { useParams } from "react-router-dom";
//recipe css


const RecipeEditForm = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null); 
  const [oldImage, setOldImage] = useState(null); 
  const ingredientsTextareaRef = useRef(null);
  const instructionsTextareaRef = useRef(null);
  const fileInputRef = useRef(null); // Reference to file input element

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/${id}`);
        setRecipeData(response.data);
        setOldImage(response.data.imageUrl); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to fetch recipe. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchRecipe();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !recipeData.title ||
        !recipeData.ingredients ||
        !recipeData.instructions ||
        !recipeData.cuisineType ||
        !image
      ) {
        setError("Please fill out all fields and upload an image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", recipeData.title);
      formData.append("ingredients", recipeData.ingredients);
      formData.append("instructions", recipeData.instructions);
      formData.append("cuisineType", recipeData.cuisineType);
      formData.append("userId", recipeData.userId);

       await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Failed to update recipe.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    // Update the old image preview immediately
    setOldImage(URL.createObjectURL(file));
  };

  const handleOldImageClick = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', marginBottom: '20px', border: '1px solid #dc3545', borderRadius: '4px', backgroundColor: '#f8d7da', color: '#721c24' }}>{error}</div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', paddingBottom: '40px' }}>
      {/* Display the old image */}
      {oldImage && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={oldImage}
            alt="Old Recipe Image"
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
            onClick={handleOldImageClick}
          />
        </div>
      )}
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center', marginTop: '40px' }}>Edit Recipe</h2>
      <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>Title:</label>
          <input
            type="text"
            name="title"
            value={recipeData.title || ""}
            onChange={handleInputChange}
            style={{ fontSize: '14px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', padding: '5px 0', width: '100%', outline: 'none' }}
            required
          />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>Ingredients:</label>
          <textarea
            ref={ingredientsTextareaRef}
            name="ingredients"
            value={recipeData.ingredients || ""}
            onChange={handleInputChange}
            style={{ fontSize: '14px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', padding: '5px 0', width: '100%', resize: 'none', outline: 'none' }}
            required
          />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>Instructions:</label>
          <textarea
            ref={instructionsTextareaRef}
            name="instructions"
            value={recipeData.instructions || ""}
            onChange={handleInputChange}
            style={{ fontSize: '14px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', padding: '5px 0', width: '100%', resize: 'none', outline: 'none' }}
            required
          />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>Cuisine Type:</label>
          <input
            type="text"
            name="cuisineType"
            value={recipeData.cuisineType || ""}
            onChange={handleInputChange}
            style={{ fontSize: '14px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', padding: '5px 0', width: '100%', outline: 'none' }}
            required
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        {error && <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #dc3545', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>{error}</div>}
        {success && (
          <div style={{ color: '#155724', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>
            Recipe updated successfully.
          </div>
        )}
        <button type="submit" style={{ fontSize: '14px', padding: '10px 35px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', width: '100%' }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default RecipeEditForm;
