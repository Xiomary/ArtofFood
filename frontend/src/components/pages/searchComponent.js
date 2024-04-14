import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Import useState and useEffect hooks
import React, { useState, useEffect } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8081/recipe/recipes/search?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      onSearch(data.recipes);
    } catch (error) {
      console.error('Error searching for recipes:', error);
      // Handle error
    }
  };

  // UseEffect hook to trigger search when searchQuery changes
  useEffect(() => {
    // Ensure searchQuery is not empty before triggering search
    if (searchQuery.trim() !== '') {
      handleSearch();
    }
  }, [searchQuery]); // Trigger effect whenever searchQuery changes



  const cardStyle = {
    marginBottom: '20px',
    maxWidth: '100%',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url("/images/hero-banner-large.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: '0px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const inputGroupStyle = {
    width: '50%', 
    minWidth: '300px', 
  };

 
  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  return (
    <div style={cardStyle}>
      <Form onSubmit={(e) => {e.preventDefault(); handleSearch();}} style={formStyle}>
        <InputGroup style={inputGroupStyle}>
          <Form.Control
            type="text"
            placeholder="Search by title, ingredients, or cuisine type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faSearch} />
            <span style={{ marginLeft: '10px' }}>Search</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchComponent;
