import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  // Debounced version of the search function
  const debouncedSearch = debounce(onSearch, 300);

  const handleSearch = (event) => {
    event.preventDefault();
    debouncedSearch(searchQuery);
  };

  // Styles
  const cardStyle = {
    marginBottom: '20px',
    maxWidth: '100%',
    height: '400px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url("/images/hero-banner-large.jpg")`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    marginTop: '20px', 
    marginLeft: '20px', 
    marginRight: '20px', 
  };

  const inputGroupStyle = {
    width: '50%', // Set width as per your design
    minWidth: '300px', // Minimum width of the input group
  };

  // Centering the input group within the form
  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  return (
    <div style={cardStyle}>
      <Form onSubmit={handleSearch} style={formStyle}>
        <InputGroup style={inputGroupStyle}>
          <Form.Control
            type="text"
            placeholder="Enter recipe name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              debouncedSearch(e.target.value);
            }}
            style={{ 
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: 'transparent',
              borderRadius: '0.25rem'
            }}
          />
          <Button variant="primary" type="submit" style={{
            backgroundColor: '#6f42c1',
            borderColor: '#6f42c1',
            boxShadow: 'none'
          }}>
            <FontAwesomeIcon icon={faSearch} />
            <span style={{ marginLeft: '10px' }}>Search</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchComponent;
