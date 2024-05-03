import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/recipe/recipes/search?query=${encodeURIComponent(searchQuery.trim())}`,
        {}
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.recipes);
      onSearch(data.recipes);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  const cardStyle = {
    marginBottom: "20px",
    maxWidth: "100%",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url("/images/hero-banner-large.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    boxSizing: "border-box",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: "0px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const inputGroupStyle = {
    width: "50%",
    minWidth: "300px",
  };

  const formStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  const desiredDishStyle = {
    fontSize: "2em",
    fontWeight: "bold",
    fontFamily: "cursive",
    marginBottom: "10px",
    marginLeft: "-10px",
  };

  return (
    <div style={cardStyle}>
      <div style={desiredDishStyle}>Your Desired Dish?</div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        style={formStyle}
      >
        <InputGroup style={inputGroupStyle}>
          <Form.Control
            type="text"
            placeholder="Search by title, ingredients, or cuisine type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="primary" type="submit" style={{ backgroundColor: "#00A8FF" }}>
            <FontAwesomeIcon icon={faSearch} />
            <span style={{ marginLeft: "10px" }}>Search</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchComponent;
