import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const renderImage = () => {
    if (recipe.imageUrl) {
      return <Card.Img variant="top" src={recipe.imageUrl} style={{ height: '250px', objectFit: 'cover' }} />;
    }
    // Fallback image if recipe.imageUrl is not available
    return <div style={{ height: '250px', background: '#e9ecef', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Image</div>;
  };

  return (
    <>
      <Card onClick={handleShowModal} style={{ cursor: "pointer", maxWidth: "350px", margin: "10px" }}>
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.username}</Card.Text>
          {renderImage()}
        </Card.Body>
      </Card>

    
    </>
  );
};

export default RecipeCard;

