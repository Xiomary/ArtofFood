import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import getUserInfo from "../../utilities/decodeJwt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import RecipeCommentForm from "./RecipeCommentForm";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");
  const [hasAlreadyRated, setHasAlreadyRated] = useState(false);
  const [isRecipeOwner, setIsRecipeOwner] = useState(false);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
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
  }, [id, loggedInUser]);

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
        const ratingCheckResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/ratings/checkUserRating/${id}`, {
          params: { userId: loggedInUser.id },
        });
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
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/ratings/add/${id}`, {
        userId: loggedInUser.id,
        score: newRating,
      });
      setHasAlreadyRated(true);
      setError("Rating added successfully.");
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || "Failed to submit rating.");
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      {loadingRecipe || loadingUser ? (
        <div style={{ color: "red" }}>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : !recipe ? (
        <div style={{ color: "red" }}>Recipe not found.</div>
      ) : (
        <div className="recipe-card" style={{ maxWidth: "800px", width: "100%", background: "#f5f5f5", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ width: "70%" }}>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{recipe.title}</h2>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <strong>Created by:</strong>&nbsp;{user ? user.username : "Unknown User"}
              </div>
            </div>
            <div style={{ width: "30%", textAlign: "right" }}>
              <div style={{ display: "inline-block", background: getRandomColor(), color: "black", borderRadius: "15px", padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                {recipe.cuisineType}
              </div>
            </div>
          </div>
          <div style={{ width: "100%", height: "300px", overflow: "hidden", marginBottom: "20px" }}>
            <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Ingredients:</h3>
            <div style={{ whiteSpace: "pre-line", fontSize: "14px", lineHeight: "1.5" }}>
              {showAllIngredients ? recipe.ingredients.map((ingredient, index) => <p key={index}>{index + 1}. {ingredient}</p>) : recipe.ingredients.slice(0, 5).map((ingredient, index) => <p key={index}>{index + 1}. {ingredient}</p>)}
            </div>
            {recipe.ingredients.length > 5 && (
              <button onClick={() => setShowAllIngredients(!showAllIngredients)} style={{ fontSize: "14px", marginTop: "10px", border: "none", background: "none", color: "#007bff", cursor: "pointer" }}>
                {showAllIngredients ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Instructions:</h3>
            <div style={{ whiteSpace: "pre-line", fontSize: "14px", lineHeight: "1.5" }}>
              {recipe.instructions.map((instruction, index) => <p key={index}>{index + 1}. {instruction}</p>)}
            </div>
          </div>
          {loggedInUser && !isRecipeOwner && (
            <div style={{ marginTop: "20px" }}>
              {hasAlreadyRated ? (
                <p>You have already rated this recipe.</p>
              ) : (
                <>
                  <strong>Rate this recipe:</strong>
                  <StarRating newRating={handleRating}/>
                </>
              )}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            {loggedInUser && isRecipeOwner && (
              <>
                <Link to={`/recipeEdit/${recipe._id}`} className="btn btn-primary btn-sm" style={{ background: "transparent", color: "#00A8FF", border: "none", marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faEdit} style={{ color: "#00A8FF", marginRight: "4px" }} />
                  EDIT
                </Link>
                <button onClick={handleDelete} className="btn btn-primary btn-sm" style={{ background: "transparent", color: "#00A8FF", border: "none" }}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#00A8FF", marginRight: "4px" }} />
                  DELETE
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {loggedInUser && !hasAlreadyRated && (
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <RecipeCommentForm recipeId={id} loggedInUser={loggedInUser} />
        </div>
      )}
    </div>
  );
};

// Function to generate random background color
const getRandomColor = () => {
  const colors = ['#FFC6C2', '#FFDDC0', '#D8FFC2', '#C2DFFF', '#F4C430', '#E6B333', '#FFE0FB'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default RecipeDetails;
