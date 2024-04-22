import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Import Link component

const ProfileUpdate = () => {
  const { userId } = useParams();
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null); // State to hold the uploaded image file
  const [oldImage, setOldImage] = useState(""); // State to hold the old image URL
  const fileInputRef = useRef(null); // Reference to file input element

  const [userProfile, setUserProfile] = useState({
    userId: "",
    name: "",
    bio: "",
    imageUrl: "",
  });

   // Inline styles for layout
   const profileContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const imageContainerStyle = {
    position: 'relative',
    marginBottom: '10px',
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '100px', // makes the image round
    objectFit: 'cover',
    border: '3px solid white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const editButtonStyle = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    padding: '5px 10px',
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getProfile/${userId}`);
        const userData = response.data.user;
        if (userData) {
          setUserProfile(userData);
          setEditedName(userData.name);
          setEditedBio(userData.bio);
          setOldImage(userData.imageUrl); // Set the old image URL
          console.log('User ID:', userData.userId);
        }
      } catch (err) {
        setError("Failed to fetch user profile: " + (err.response?.data?.message || err.message));
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setOldImage(URL.createObjectURL(file)); // Update the old image preview immediately
  };

  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", editedName);
      formData.append("bio", editedBio);
      formData.append("userId", userProfile.userId);

      const response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profileUpdate/${userId}`,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserProfile(response.data.user);
      console.log("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={profileContainerStyle}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the input element visually
      />

      {oldImage && (
        <div style={imageContainerStyle}>
          <img
            src={oldImage}
            alt={`${userProfile.name}'s profile`}
            style={imageStyle}
          />
          <button onClick={handleEditImage} style={editButtonStyle}>Edit Image</button>
        </div>
      )}

      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        value={editedBio}
        onChange={(e) => setEditedBio(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleUpdateProfile} style={buttonStyle}>
        Update Profile
      </button>

      <Link to={`/profileDetails/${userId}`} style={buttonStyle}>
        View Profile
      </Link>
    </div>
  );
};

export default ProfileUpdate;
