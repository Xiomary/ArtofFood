import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileDetailsPage = () => {
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
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          overflow: "hidden",
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          {profile?.name} 
        </h1>
        <p style={{ fontSize: "1rem" }}>{profile?.bio}</p>{" "}
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
