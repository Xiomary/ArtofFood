import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeEditForm = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/${id}`
        );
        setRecipeData(response.data);
        setImagePreview(response.data.imageUrl);
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
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", recipeData.title);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    formData.append("cuisineType", recipeData.cuisineType);
    formData.append("userId", recipeData.userId);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Failed to update recipe. Please try again later.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); 
    setImage(null);
    setImagePreview(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        paddingBottom: "40px",
        fontFamily: "Roboto,Helvetica Neue, sans-serif",
      }}
    >
      {error && (
        <div
          style={{
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
            fontFamily: "Roboto,Helvetica Neue, sans-serif",
          }}
        >
          {error}
        </div>
      )}
      <form
        onSubmit={handleFormSubmit}
        style={{
          marginTop: "20px",
          fontFamily: "Roboto,Helvetica Neue, sans-serif",
        }}
      >
        <div style={{ marginBottom: "50px", textAlign: "center" }}>
          <div
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              border: "3px solid white",
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.3s",
              position: "relative",
              backgroundColor: imagePreview ? "transparent" : "#f8f9fa",
              overflow: "hidden",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.opacity = "0.9"; // Adjust opacity here
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.opacity = "1"; // Reset opacity when leaving
            }}
            onClick={handleUploadClick}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Recipe"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    color: "black",
                    marginBottom: "5px",
                  }}
                >
                  +
                </div>
                <div style={{ fontSize: "14px", color: "black" }}>
                  Click to Add Image
                </div>
              </div>
            )}
            {imagePreview && (
              <div
                onClick={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#FF0000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                &minus;
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={{ marginBottom: "10px", display: "block" }}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={recipeData.title || ""}
            onChange={handleInputChange}
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%",
              outline: "none",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <label style={{ marginBottom: "10px", display: "block" }}>
            Ingredients:
          </label>
          <textarea
            name="ingredients"
            value={recipeData.ingredients || ""}
            onChange={handleInputChange}
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%",
              resize: "vertical",
              outline: "none",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <label style={{ marginBottom: "10px", display: "block" }}>
            Instructions:
          </label>
          <textarea
            name="instructions"
            value={recipeData.instructions || ""}
            onChange={handleInputChange}
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%",
              resize: "vertical",
              outline: "none",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <label style={{ marginBottom: "10px", display: "block" }}>
            Cuisine Type:
          </label>
          <input
            type="text"
            name="cuisineType"
            value={recipeData.cuisineType || ""}
            onChange={handleInputChange}
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%",
              outline: "none",
            }}
            required
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {error && (
          <div
            style={{
              color: "#721c24",
              backgroundColor: "#f8d7da",
              border: "1px solid #dc3545",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "#155724",
              backgroundColor: "#d4edda",
              border: "1px solid #c3e6cb",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            Recipe updated successfully.
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#00A8FF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default RecipeEditForm;
