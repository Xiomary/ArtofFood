import React, { useState, useEffect } from "react";
import { Form, Button, Image, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const RecipeCommentForm = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setLoggedInUser(userInfo);
    };

    fetchUserInfo();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/${id}/comments`);
      if (response.status === 200) {
        const data = response.data;
        const commentsWithUsernamesAndImages = await Promise.all(
          data.map(async (comment) => {
            const profileResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getProfile/${comment.userId}`);
            if (profileResponse.status === 200) {
              const profileData = profileResponse.data.user;
              return {
                ...comment,
                username: profileData.name,
                imageUrl: profileData.imageUrl,
              };
            } else {
              console.error("Failed to fetch user profile for comment");
              return comment;
            }
          })
        );
        setComments(commentsWithUsernamesAndImages);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Failed to connect to server", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      console.error("User not identified.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/addComment/${id}`, {
        userId: loggedInUser.id,
        content: comment,
      });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!commentToDelete) return;
  
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/comments/delete/${commentToDelete._id}`);
      setComments(comments.filter((comment) => comment._id !== commentToDelete._id));
      setCommentToDelete(null);
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Comments:</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment" style={{ position: "relative" }}>
          <Form.Control
            as="textarea"
            rows={3}
            style={{
              borderRadius: "4px",
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ccc",
              marginBottom: "20px",
              resize: "vertical",
            }}
            placeholder="Start typing here to add a comment!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="primary"
            type="submit"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "#00A8FF",
              border: "none",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
      {comments.length > 0 && (
        <div>
          {comments.map((comment) => (
            <div
              key={comment._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {comment.imageUrl && (
                <Image
                  src={comment.imageUrl}
                  roundedCircle
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
              )}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", marginBottom: "4px", fontWeight: "bold" }}>{comment.username}</p>
                <p style={{ fontSize: "12px", marginBottom: "4px" }}>{comment.content}</p>
              </div>
              {loggedInUser && loggedInUser.id === comment.userId && (
                <FaTrash
                  style={{ color: "#00A8FF", cursor: "pointer" }}
                  onClick={() => {
                    setCommentToDelete(comment);
                    setShowModal(true);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecipeCommentForm;
