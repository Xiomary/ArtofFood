import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button"; // Assuming you are using Bootstrap for Button component

const ProfileUpdate = () => {
  const { userId } = useParams();
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [userProfile, setUserProfile] = useState({
    userId: "",
    name: "",
    bio: "",
    imageUrl: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getProfile/${userId}`
        );
        const userData = response.data.user;
        if (userData) {
          setUserProfile(userData);
          setEditedName(userData.name);
          setEditedBio(userData.bio);
          setOldImage(userData.imageUrl);
        }
      } catch (err) {
        setError(
          "Failed to fetch user profile: " +
            (err.response?.data?.message || err.message)
        );
      }
    };
    fetchUserProfile();
  }, [userId]);

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

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", editedName);
      formData.append("bio", editedBio);
      formData.append("userId", userProfile.userId);

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profileUpdate/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserProfile(response.data.user);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ marginRight: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {oldImage ? (
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={oldImage}
                alt={`${userProfile.name}'s profile`}
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
              onClick={() => fileInputRef.current.click()}
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
                  fontSize: "24px",
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
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {editingName ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  autoFocus
                  style={{ borderBottom: "1px solid black", marginRight: "10px", padding: "8px 0" }}
                />
              </>
            ) : (
              <>
                <div
                  style={{ marginRight: "10px", borderBottom: editingName ? "1px solid black" : "none" }}
                >
                  {userProfile.name}
                </div>
                <FaPencilAlt
                  style={{ cursor: "pointer", color: "#00A8FF", fontSize: "14px" }}
                  onClick={() => setEditingName(true)}
                />
              </>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            {editingBio ? (
              <>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  onBlur={() => setEditingBio(false)}
                  autoFocus
                  style={{ width: "100%", borderBottom: "1px solid black", padding: "8px", marginRight: "10px", height: "80px" }}
                />
              </>
            ) : (
              <>
                <p style={{ marginBottom: "0", flex: "1" }}>{userProfile.bio}</p>
                <FaPencilAlt
                  style={{ cursor: "pointer", color: "#00A8FF", fontSize: "14px" }}
                  onClick={() => setEditingBio(true)}
                />
              </>
            )}
          </div>
          <Link
            to={`/profileDetails/${userId}`}
            style={{
              padding: "5px 10px",
              backgroundColor: "#00A8FF",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            View Profile
          </Link>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 20, left: 20, width: "calc(100% - 40px)", backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px", zIndex: 999 }}>
        <div style={{ width: "100%" }}>
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
            }}
            onClick={handleSaveProfile}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
