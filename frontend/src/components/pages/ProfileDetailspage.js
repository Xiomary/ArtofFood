import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileDetails = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getProfile/${userId}`);
        setProfile(response.data.user);
      } catch (err) {
        setError(
          "Failed to fetch profile: " +
            (err.response?.data?.message || err.message)
        );
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading profile...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        width: "100%", 
        padding: "20px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px", 
        backgroundColor: "#fff", 
      }}
    >
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: "20px",
        }}
      >
        <img
          src={profile?.imageUrl || "default-image-url.jpg"}
          alt={`${profile?.name}'s profile`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#333" }}>
          {profile?.name} 
        </h1>
        <p style={{ fontSize: "1rem", color: "#666" }}>{profile?.bio}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
