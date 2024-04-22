import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import StarRating from "./StarRatings"; // Import the StarRating component
import getUserInfo from "../../utilities/decodeJwt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import RecipeCommentForm from "./RecipeCommentForm";

const recipeContainerStyles = {
  display: "flex",
  flexDirection: "column",
  background: "#fff",
};

const recipeHeaderStyles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid #ddd",
};

const recipeMetaStyles = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
};

const recipeBodyStyles = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const cardImageContainerStyles = {
  marginTop: "20px",
};

const cardImageStyles = {
  width: "250px",
  height: "auto",
  marginRight: "20px", 
};

const horizontalLineStyle = {
  borderTop: "1px solid #999",
  margin: 0,
  width: "100%",
};

const smallerTextStyles = {
  fontSize: "14px", 
};

const buttonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '4px',
  margin: '4px',
};

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");
  const [hasAlreadyRated, setHasAlreadyRated] = useState(false);
  const [isRecipeOwner, setIsRecipeOwner] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
    }
  }, []);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/${id}`);
        setRecipe(response.data);
        setLoadingRecipe(false);
        if (response.data.userId) {
          fetchUser(response.data.userId);
        }
        if (loggedInUser) {
          checkUserRating(response.data.userId);
          setIsRecipeOwner(response.data.userId === loggedInUser.id);
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setError("Failed to load recipe data. Please try again later.");
        setLoadingRecipe(false);
      }
    };
  
    fetchRecipeData();
  }, [id, loggedInUser]); // Correctly added loggedInUser as a dependency

  const fetchUser = (userId) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getUserById/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
        setLoadingUser(false);
      });
  };

  const checkUserRating = async (recipeOwnerId) => {
    if (loggedInUser && loggedInUser.id !== recipeOwnerId) {
      try {
        const ratingCheckResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/ratings/checkUserRating/${id}`,
          {
            params: { userId: loggedInUser.id },
          }
        );
        setHasAlreadyRated(ratingCheckResponse.data.hasRated);
      } catch (error) {
        console.error("Error checking user rating:", error);
      }
    }
  };

  const handleRating = async (newRating) => {
    if (recipe.userId === loggedInUser.id) {
      setError("Cannot rate your own recipe.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/ratings/add/${id}`,{
        userId: loggedInUser.id,
        score: newRating,
      });
      alert("Rating submitted successfully!");
      setHasAlreadyRated(true);
    } catch (error) {
      console.error(
        "Error submitting rating:",
        error.response?.data || "Failed to submit rating."
      );
      setError(error.response?.data || "Failed to submit rating.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/delete/${id}`);
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete recipe.");
    }
  };

  return (
    <div className="container mt-4">
      {loadingRecipe || loadingUser ? (
        <div className="text-danger">Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : !recipe ? (
        <div className="text-danger">Recipe not found.</div>
      ) : (
        <div className="row">
          <div className="col-md-8 mb-3" style={recipeContainerStyles}>
            <div style={recipeHeaderStyles}>
              <div style={cardImageContainerStyles}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  style={cardImageStyles}
                />
              </div>
              <h2>{recipe.title}</h2>
            </div>
            <div style={recipeMetaStyles}>
              <p style={smallerTextStyles}>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p style={smallerTextStyles}>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p style={smallerTextStyles}>
                <strong>Cuisine Type:</strong> {recipe.cuisineType}
              </p>
            </div>
            {!loggedInUser && (
              <div style={recipeBodyStyles}>
                <p>Sign in to rate, comment, and edit.</p>
              </div>
            )}
            {loggedInUser && loggedInUser.id !== recipe.userId && (
              <div style={recipeBodyStyles}>
                <StarRating
                  newRating={handleRating}
                  disabled={hasAlreadyRated}
                />
                {hasAlreadyRated && (
                  <p className="text-secondary">
                    You have already rated this recipe.
                  </p>
                )}
                <RecipeCommentForm />
              </div>
            )}
          </div>
        </div>
      )}

      <hr style={{ ...horizontalLineStyle }} />
      <div className="row justify-content-start">
        <div className="col-md-8 mb-3">
          {loggedInUser && isRecipeOwner && (
            <div>
              <div style={{ ...buttonStyles }}>
                <Link
                  to={`/recipeEdit/${recipe._id}`}
                  className="btn btn-primary btn-sm mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '4px' }} />
                  Edit
                </Link>
                <button onClick={handleDelete} className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: '4px' }} />
                  Delete
                </button>
              </div>
              <h4 style={{ marginLeft: "auto", marginTop: "10px", ...smallerTextStyles }}>
                Created by: {user ? user.username : "Unknown User"}
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

