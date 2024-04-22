import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./addCommentPage2.css";
import getUserInfo from "../../utilities/decodeJwt";

const RecipeCommentForm = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setLoggedInUser(userInfo);
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      alert("User not identified.");
      return;
    }

    const userId = loggedInUser.id;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/addComment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content: comment }),
      });
      if (response.ok) {
        alert("Comment added successfully!");
        setComment("");
      } else {
        alert("Failed to add comment. Please try again later.");
      }
    } catch (error) {
      alert("Failed to connect to server. Please try again later.");
    }
  };

  return (
    <div className="comments-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Label style={{ marginBottom: '5px' }}>Comment:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RecipeCommentForm;