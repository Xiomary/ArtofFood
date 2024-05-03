import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../utilities/decodeJwt';
import axios from 'axios';

export default function AppNavbar() {
  const [user, setUser] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = getUserInfo();
      setUser(userInfo);
      if (userInfo) {
        fetchProfileImage(userInfo);
      }
    };

    fetchUserInfo();
  }, []);

  const fetchProfileImage = async (userInfo) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getProfile/${userInfo.id}`);
      if (response.status === 200) {
        setProfileImageUrl(response.data.user.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setProfileImageUrl(null);
    navigate('/');
  };

  return (
    <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/homePage">
         
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/homePage" style={{ color: 'white' }}>Home</Nav.Link>
            <Nav.Link href="/recipeList" style={{ color: 'white' }}>Search</Nav.Link>
          </Nav>
          {user && (
            <Dropdown alignRight>
              <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
                {profileImageUrl && <img src={profileImageUrl} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />}
                <span style={{ color: 'white', marginLeft: '10px' }}>{user.username}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/recipeForm">
                  <FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: '10px' }} /> Create Recipe
                </Dropdown.Item>
                <Dropdown.Item href="/privateUserProfile">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> View Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
