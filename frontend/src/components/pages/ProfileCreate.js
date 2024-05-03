import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const ProfileCreate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
      console.log("Decoded UserInfo:", userInfo);
    } else {
      setError("User not authenticated.");
    }
  }, []);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    fileInputRef.current.value = "";
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loggedInUser || !loggedInUser.id) {
      setError("User must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", loggedInUser.id);
    formData.append("name", name);
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      navigate(`/profileDetails/${loggedInUser.id}`);
    } catch (error) {
      console.error("Error creating profile:", error);
      setError(error.response?.data?.message || "Failed to create profile.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 style={{ fontSize: "2rem" }}>Welcome to your profile!</h1>
            <p style={{ fontSize: "1rem" }}>
              Before you get started, there are a few things that you'll need
              to set up.
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicImage">
                <Form.Label>Upload an image for your profile:</Form.Label>
                <div
                  style={{
                    position: "relative",
                    width: "200px", 
                    height: "200px", 
                    margin: "0 auto",
                  }}
                >
                  <input
                    ref={fileInputRef}
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <div
                      style={{
                        position: "relative",
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                      onClick={handleUploadClick}
                    >
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        onClick={handleRemoveImage}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          backgroundColor: "#FF0000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          border: "2px solid white",
                          color: "white",
                        }}
                      >
                        &minus;
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={handleUploadClick}
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        backgroundColor: "#f8f9fa",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        cursor: "pointer",
                        color: "black",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "40px",
                          color: "#333",
                          marginBottom: "10px",
                        }}
                      >
                        +
                      </div>
                      Click to Add Image
                    </div>
                  )}
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>
                  First, choose the name or nickname to be shown on your
                  profile.
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name/Nickname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicBio">
                <Form.Label>Now, choose a bio for your profile.</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#00A8FF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  width: "100%",
                  fontSize: "14px",
                  marginTop: "20px", 
                }}
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileCreate;
