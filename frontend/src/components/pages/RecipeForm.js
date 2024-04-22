import React, { useState, useEffect } from "react";
import { Image, Card } from "react-bootstrap"; 
import getUserInfo from "../../utilities/decodeJwt";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user information:", error);
        setError("Failed to fetch user information");
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("ingredients", ingredients);
    formData.append("cuisineType", cuisineType);
    formData.append("userId", user.id);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/add`, {
        method: "POST",
        body: formData,
      });

      setIsLoading(false);
      if (response.ok) {
        setShowModal(true);
        setTitle("");
        setInstructions("");
        setIngredients("");
        setCuisineType("");
        setImage(null);
        setImagePreview(null); 
      } else {
        setError("Failed to add recipe. Please try again later.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Failed to connect to server. Please try again later.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Create a preview of the uploaded image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    document.getElementById("recipeImage").click();
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        paddingBottom: "40px",
        fontFamily: "Georgia, Times, serif",
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
            fontFamily: "Georgia, Times, serif",
          }}
        >
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "20px", fontFamily: "Georgia, Times, serif" }}
      >
        <div
          style={{
            marginBottom: "50px",
            textAlign: "center",
            fontFamily: "Georgia, Times, serif",
          }}
          onClick={handleUploadClick}
        >
          <Card
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Georgia, Times, serif",
              margin: "auto",
              border: "3px solid white",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: "background-color 0.3s", 
              position: "relative",
            }}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = "#f8f9fa";}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = "white";}}
          >
            {imagePreview ? (
              <Card.Img
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
                    fontFamily: "Georgia, Times, serif",
                    color: "black",
                    marginBottom: "5px",
                  }}
                >
                  +
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, Times, serif",
                    fontSize: "14px",
                    color: "black",
                    whiteSpace: "nowrap",
                  }}
                >
                  Click to Add Image
                </div>
              </div>
            )}
          </Card>

          <input
            id="recipeImage"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div
          style={{ marginBottom: "20px", fontFamily: "Georgia, Times, serif" }}
        >
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              fontFamily: "Georgia, Times, serif",
              fontSize: "9px",
              color: "black",
            }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              fontFamily: "Georgia, Times, serif",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%", 
              outline: "none",
              fontSize: "9px",
              color: "black",
            }}
          />
        </div>

        <div
          style={{ marginBottom: "20px", fontFamily: "Georgia, Times, serif" }}
        >
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              fontSize: "9px",
              color: "black",
            }}
          >
            Ingredients
          </label>
          <textarea
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%", 
              resize: "none",
              outline: "none",
              fontSize: "9px",
              color: "black",
            }}
          />
        </div>

        <div
          style={{ marginBottom: "20px", fontFamily: "Georgia, Times, serif" }}
        >
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              fontSize: "9px",
              color: "black",
            }}
          >
            Instructions
          </label>
          <textarea
            rows={3} 
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%", 
              resize: "none",
              outline: "none",
              fontSize: "9px",
              color:"black",
            }}
          />
        </div>

        <div
          style={{ marginBottom: "20px", fontFamily: "Georgia, Times, serif" }}
        >
          <label
            style={{
              marginBottom: "5px",
              display: "block",
              fontSize: "9px",
              color: "black",
            }}
          >
            Cuisine Type
          </label>
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
              width: "100%", 
              outline: "none",
              fontSize: "9px",
              color: "black",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "8px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            width: "100%",
            fontSize: "14px",
          }}
        >
          {isLoading ? "Submitting..." : "Create"}
        </button>
      </form>

      {showModal && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <p>Recipe Submitted</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
