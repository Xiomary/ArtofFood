import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
      setName(userInfo.name || ""); // Set the name from userInfo or empty string if not available
      setBio(userInfo.bio || ""); // Set the bio from userInfo or empty string if not available
      setOldImage(userInfo.imageUrl || ""); // Set the old image from userInfo or empty string if not available
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setOldImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setOldImage("");
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profile`, formData);
      alert("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data?.message || error.message);
    }
  };

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
        <div style={{ marginBottom: '20px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          {oldImage ? (
            <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '100px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
              <img
                src={oldImage}
                alt="Profile"
                style={{ width: '100%', height: '100%', borderRadius: '100px', objectFit: 'cover' }}
              />
              <div onClick={handleRemoveImage} style={{ position: 'absolute', top: '5px', right: '5px', borderRadius: '50%', width: '24px', height: '24px', backgroundColor: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid white', color: 'white' }}>
                &minus;
              </div>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current.click()} style={{ width: '200px', height: '200px', borderRadius: '100px', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', cursor: 'pointer', color: 'black', position: 'relative' }}>
              <div style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>+</div>
              Click to Add Image
            </div>
          )}
        </div>
        <Button variant="primary" type="submit">
          Create Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileForm;
