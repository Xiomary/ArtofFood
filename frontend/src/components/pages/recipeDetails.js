import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"; // Ensure this is used or remove if unnecessary
import StarRating from "./StarRatings";
import getUserInfo from "../../utilities/decodeJwt";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");
  const [hasAlreadyRated, setHasAlreadyRated] = useState(false); // State to track if the current user has already rated
  const { id } = useParams();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/recipe/${id}`)
      .then((response) => {
        console.log("Recipe data:", response.data);
        setRecipe(response.data);
        setLoadingRecipe(false);
        fetchUser(response.data.userId);

        // Additional check for existing rating by the logged-in user
        const checkUserRating = async () => {
          try {
            const ratingCheckResponse = await axios.get(`http://localhost:8081/ratings/checkUserRating/${id}`, {
              params: { userId: loggedInUser?.id }
            });
            setHasAlreadyRated(ratingCheckResponse.data.hasRated);
          } catch (error) {
            console.log("Error checking user rating:", error);
          }
        };

        if (loggedInUser) {
          checkUserRating();
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the recipe data:", error);
        setError("Failed to load recipe data.");
        setLoadingRecipe(false);
      });
  }, [id, loggedInUser]);

  const fetchUser = (userId) => {
    axios
      .get(`http://localhost:8081/user/getUserById/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data:", error);
        setError("Failed to load user data.");
        setLoadingUser(false);
      });
  };

  const handleRating = async (newRating) => {
    if (recipe.userId === loggedInUser?.id) {
      setError('Cannot rate your own recipe.');
      return;
    }

    try {
      await axios.post(`http://localhost:8081/ratings/add/${id}`, {
        userId: loggedInUser?.id,
        score: newRating,
      });
      alert("Rating submitted successfully!");
      setHasAlreadyRated(true); // Update to reflect the new rating status
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || 'Failed to submit rating.');
      setError(error.response?.data || 'Failed to submit rating.');
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        {(loadingRecipe || loadingUser) && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!recipe && !loadingRecipe && <div>Recipe not found.</div>}
        {recipe && (
          <>
            <h2>Recipe name: {recipe.title}</h2>
            <p><strong>Cuisine Type:</strong> {recipe.cuisineType}</p>
            <div>
              <h4>Created by: {user ? user.username : "Unknown User"}</h4>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
            <Link to={`/recipe/edit/${id}`}><button>Edit Recipe</button></Link>
          </>
        )}
      </div>
      {recipe && (
        <div style={{ maxWidth: "50%", textAlign: "center" }}>
          <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "100%", height: "auto" }} />
          <div style={{ marginTop: "20px" }}>
            <StarRating newRating={handleRating} disabled={recipe.userId === loggedInUser?.id || hasAlreadyRated} />
            {hasAlreadyRated && <p>You have already rated this recipe.</p>}
          </div>
        </div>
      )}
    </div>
  );
}; 

export default RecipeDetails;
