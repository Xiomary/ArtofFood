import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
//import profile edit form

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); // Define the state for the logged-in user

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
      setName(userInfo.name || ""); // Set the name from userInfo or empty string if not available
      setBio(userInfo.bio || ""); // Set the bio from userInfo or empty string if not available
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    // Append user ID if available
    if (loggedInUser) {
      formData.append("userId", loggedInUser.id);
    }

    try {
      const response = await axios.post(`http://localhost:8081/user/profile`, formData);
      alert("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data?.message || error.message);
    }
  };

  // Check if name or bio is not set for the logged-in user
  if (!name || !bio) {
    return (
      <div className="profile-edit-page" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Create Profile</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Profile
          </Button>
        </Form>
      </div>
    );
  }
};

export default ProfileForm;
