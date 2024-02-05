import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup"; // Import ListGroup for listing ingredients

const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const renderImage = () => {
    if (recipe.imageUrl) {
      return <Card.Img variant="top" src={recipe.imageUrl} style={{ height: '250px', objectFit: 'cover' }} />;
    }
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{recipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Ingredients</h5>
          <ListGroup>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mt-3">Instructions</h5>
          <p>{recipe.instructions.join(' ')}</p> {/* Assuming instructions is an array */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecipeCard;
