import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe, averageRating }) => {
  return (
    <Card
      style={{
        width: "18rem", 
        height: "20rem", 
        margin: "0.5rem",
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card.Img
        variant="top"
        src={recipe.imageUrl || "default-image-url.jpg"}
        style={{ height: "12rem", objectFit: "cover" }} // Adjusted height to match image height in the second image
      />
      <Card.Body style={{ padding: "1rem", flexGrow: 1 }}>
        <Card.Title style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
          {recipe.title}
        </Card.Title>
        {/* Render the username only if it's provided */}
        {recipe.username && (
          <Card.Text style={{ fontSize: "0.85rem", color: "gray" }}>
            {recipe.username}
          </Card.Text>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <div></div>

          {averageRating && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.9rem",
              }}
            >
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "yellow", marginRight: "0.25rem" }}
              />
              {averageRating.toFixed(1)}
            </div>
          )}
        </div>
        <Link
          to={`/recipeDetails/${recipe._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="primary"
            style={{ width: "100%", padding: "0.5rem 0", fontSize: "1rem" }}
          >
            View Recipe
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
