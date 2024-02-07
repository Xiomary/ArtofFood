import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import "./pages/appNavBar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  return (
    <ReactNavbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Nav className="me-auto">
          {user ? (
            // Links to display when user is logged in
            <>
              <Nav.Link href="/homePage">Home</Nav.Link>
              <Nav.Link href="/recipeList">Search</Nav.Link>
              <Nav.Link href="/recipeForm">New Recipe</Nav.Link>
              <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
            </>
          ) : (
            // Links to display when user is not logged in
            <>
              <Nav.Link href="/loginPage">Login</Nav.Link>
              <Nav.Link href="/signupPage">Sign up</Nav.Link>
              <Nav.Link href="/recipeList">Search</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
