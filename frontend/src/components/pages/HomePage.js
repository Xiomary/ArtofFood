import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setUser(getUserInfo(token));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/loginPage');
  };

  const handleCreateAccount = () => {
    navigate('/signUp');
  };

  // Custom styles for the buttons
  const buttonStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#0275d8', 
  };

  // Custom styles for the cursive text
  const cursiveTextStyle = {
    fontFamily: 'cursive',
    marginBottom:"70px",
    fontSize: '50px', // Increased font size to 36px
    marginBottom: '10px',
  };

  return (
    <div
      className="my-container"
      style={{
        backgroundImage: "url('/images/homepage.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2, 
          color: 'white', 
          textAlign: 'center',
          padding: '2rem',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
        }}
      >
        <div style={cursiveTextStyle}>Art of Food</div>
        <h1>All of your recipes in one place</h1>
        <p>A recipe keeper, where you can search, rate, and comment on recipes.</p>
        {user ? (
          <>
            <h3>Welcome <span className="username">@{user.username}</span></h3>
            <h3>Your registered email is <span className="email">{user.email}</span></h3>
            <button style={buttonStyles} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <div> 
              <button style={buttonStyles} onClick={handleCreateAccount}>Create an Account</button>
            </div>
            <div> 
              <button style={buttonStyles} onClick={handleLogin}>Log In</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
