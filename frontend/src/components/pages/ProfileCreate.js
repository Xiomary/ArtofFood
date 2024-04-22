import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
import { Container, Row, Col } from "react-bootstrap";

const ProfileCreate = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
      console.log("Decoded UserInfo:", userInfo);
    } else {
      setError('User not authenticated.');
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
    document.getElementById("imageInput").click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loggedInUser || !loggedInUser.id) {
      setError("User must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append('userId', loggedInUser.id);
    formData.append('name', name);
    formData.append('bio', bio);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profile`,  formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Profile updated successfully!");
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error creating profile:", error);
      setError(error.response?.data?.message || 'Failed to create profile.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 style={{ fontSize: '2rem' }}>Welcome to your profile!</h1>
            <p style={{ fontSize: '1rem' }}>Before you get started, there are a few things that you'll need to set up.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>First, choose the name or nickname to be shown on your profile.</Form.Label>
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
              <Form.Group controlId="formBasicImage">
                <Form.Label>Upload an image for your profile:</Form.Label>
                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="light"
                    type="button"
                    className="rounded-circle border"
                    style={{ width: '100px', height: '100px', padding: '0', position: 'absolute', top: '0', left: '0', color: 'black' }}
                    onClick={handleUploadClick}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ) : (
                      <>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>+</span>
                        <div>Upload Image</div>
                      </>
                    )}
                  </Button>
                </div>
              </Form.Group>
              <Button variant="primary" type="submit" size="lg" className="mt-4" style={{ width: '100%' }}>
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
