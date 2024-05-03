import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const getRandomColor = () => {
  const colors = ['#FFC6C2', '#FFDD0', '#D8FFC2', '#C2DFFF', '#F4C430', 
                  '#E6B333', '#FFE0FB'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const RecipeCard = ({ recipe, averageRating }) => {
  const cuisineColor = getRandomColor();

  return (
    <Link to={`/recipeDetails/${recipe._id}`} style={{ textDecoration: "none" }}>
      <Card
        style={{
          width: "18rem",
          height: "18rem",
          margin: "0.5rem",
          borderRadius: "0.5rem",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Img
          variant="top"
          src={recipe.imageUrl || "default-image-url.jpg"}
          style={{ height: "12rem", objectFit: "cover" }}
        />
        <Card.Body style={{ padding: "0.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <Card.Title style={{ marginBottom: "0.5rem", fontSize: "1.1rem", color: "black" }}>
              {recipe.title}
            </Card.Title>
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
              <span style={{
                backgroundColor: cuisineColor,
                color: 'black',
                borderRadius: '15px',
                padding: '0.25rem 0.5rem', 
                marginRight: 'auto',
                display: 'inline-block',
                fontSize: '0.75rem'
              }}>
                {recipe.cuisineType.toUpperCase()}
              </span>
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
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default RecipeCard;
