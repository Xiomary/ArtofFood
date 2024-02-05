import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('ingredients', ingredients);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8081/recipe/add', {
        method: 'POST',
        body: formData,
      });

      setIsLoading(false);
      if (response.ok) {
        alert('Recipe added successfully!');
        setTitle('');
        setInstructions('');
        setIngredients('');
        setImage(null);
      } else {
        setError('Failed to add recipe. Please try again later.');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Failed to connect to server. Please try again later.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
// Inline CSS for the image preview
const imageStyle = {
  width: "300px",
  height: "160px",
  objectFit: 'cover', 
  marginBottom: '10px' // Add some space below the image
};

return (
  <div className="recipe-form p-4 border rounded">
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRecipeTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formRecipeIngredients" className="mb-3">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter ingredients, separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formRecipeInstructions" className="mb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Enter the cooking instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formRecipeImage" className="mb-4">
        <Form.Label>Image</Form.Label>
        <div className="image-upload-wrapper">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Recipe"
              style={imageStyle}
            />
          )}
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
        {isLoading ? (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        ) : "Submit Recipe"}
      </Button>
    </Form>
  </div>
);
};

export default RecipeForm;