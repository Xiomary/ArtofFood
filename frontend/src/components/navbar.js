import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import "./pages/appNavBar.css";
 
// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled:
  // eslint-disable-next-line
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(getUserInfo());
  }, []);
 
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Start</Nav.Link>
          <Nav.Link href="/homePage">Home</Nav.Link>
          <Nav.Link href="/routePatterns">Stations</Nav.Link>
          <Nav.Link href="/mbtaAlert">Next Train</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
          <Nav.Link href="/addCommentPage2">Make Comment</Nav.Link>
          <Nav.Link href="/viewComments">Comment List</Nav.Link>
         
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
