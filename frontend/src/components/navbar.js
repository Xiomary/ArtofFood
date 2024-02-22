import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faPlusSquare, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';

export default function AppNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  return (
    <Navbar expand="lg" variant="dark" bg="dark" sticky="top"> {/* Changed to bg="dark" */}
      <Container>
        <Navbar.Brand href="/homePage">
          <FontAwesomeIcon icon={faUtensils} /> Art of Food
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link href="/homePage">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Nav.Link>
                <Nav.Link href="/recipeList">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </Nav.Link>
                <Nav.Link href="/recipeForm">
                  <FontAwesomeIcon icon={faPlusSquare} /> New Recipe
                </Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/privateUserProfile">
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/loginPage">
                  <FontAwesomeIcon icon={faUser} /> Login
                </Nav.Link>
                <Nav.Link href="/recipeList">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
