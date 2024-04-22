import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

const PrivateUserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setLoggedInUser(userInfo);
      console.log("Logged in user:", userInfo);
      fetchProfile(userInfo.id);
    } else {
      console.log("No user info found.");
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getProfile/${userId}`);
      console.log("Profile data from server:", response.data);
      if (response.data && response.data.user) {
        setUserProfile(response.data.user);
        console.log("Profile data fetched:", response.data.user);
      } else {
        throw new Error("No profile data received");
      }
    } catch (error) {
      setError("Failed to fetch profile. Please try again later.");
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToProfileDetails = () => {
    // Logic to navigate to profile details
  };
  const styles = {
    outerContainer: {
      position: "relative",
      height: "100vh",
      backgroundColor: "#f4f5f8",
    },
    topBar: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      padding: "10px 20px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #dcdcdc",
      display: "flex",
      justifyContent: "flex-start", // Changed to "flex-start"
      alignItems: "center",
    },
    profileImage: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "10px",
      cursor: "pointer",
    },
    viewProfileLink: {
      color: "#000",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "bold",
    },
    createButton: {
      backgroundColor: "#3880ff",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    },
  };
  
  console.log("User profile state:", userProfile); // Debugging output
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userProfile && userProfile.name && userProfile.bio && userProfile.imageUrl ? (
        <div style={styles.outerContainer}>
          <div style={styles.topBar}>
            {userProfile && (
              <>
                <img
                  src={userProfile.imageUrl}
                  alt={`${userProfile.name}'s profile`}
                  style={styles.profileImage}
                  onClick={navigateToProfileDetails}
                />
                <Link to={`/profileUpdate/${userProfile.userId}`} style={styles.viewProfileLink}>
                  View/edit my profile
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 50px)" }}>
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-person-circle" style={{ fontSize: "8rem" }}></i>
            </div>
            <div className="mb-4">
              <p>You haven't set up a profile.</p>
              <p>Creating a profile allows you to set up a name, a bio, and upload an image.</p>
            </div>
            <Link to={`/profileCreate`}>
              <Button style={styles.createButton} variant="primary">
                + Create Profile
              </Button>
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default PrivateUserProfilePage;

