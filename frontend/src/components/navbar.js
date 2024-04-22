import React, { useEffect, useState } from 'react';
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faSearch, faPlusSquare, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of navigate

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
    console.log(userInfo);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsOpen(false); // Reset isOpen state to false
    navigate('/'); // Use navigate method from useNavigate hook
  };
  
  const menuIconStyle = {
    cursor: 'pointer',
    color: 'white',
    fontSize: '20px' // Reduced font size for the hamburger menu icon
  };
  

  const sidebarStyle = {
    position: 'fixed',
    top: '56px', // Set top to the height of the navbar
    left: 0,
    width: '250px',
    height: 'calc(100% - 56px)', // Adjust the height to account for the navbar
    background: 'white',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1100,
    overflowY: 'auto'
  };
  
  const sidebarItemStyle = {
    color: 'black',
    padding: '15px 25px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    textDecoration: 'none'
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
        <Container fluid>
          <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} style={menuIconStyle} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/homePage" style={{ color: 'white' }}>
                Home
              </Nav.Link>
              <Nav.Link href="/recipeList" style={{ color: 'white' }}>

               Search
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={sidebarStyle}>
        <Nav className="flex-column">
          {user ? (
            <>
              <Nav.Link href="/recipeForm" style={sidebarItemStyle}>
                <FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: '10px' }} /> Create Recipe
              </Nav.Link>
              <Nav.Link href="/privateUserProfile" style={sidebarItemStyle}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> View Profile
              </Nav.Link>
              <Nav.Link onClick={handleLogout} style={sidebarItemStyle}>
                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} /> Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/signUp" style={sidebarItemStyle}>
                Register
              </Nav.Link>
              <Nav.Link href="/loginPage" style={sidebarItemStyle}>
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </div>
    </>
  );
}
