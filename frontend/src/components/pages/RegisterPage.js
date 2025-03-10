import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PRIMARY_COLOR = '#0056b3'; 
const TEXT_COLOR_WHITE = '#fff'; 
const INPUT_BORDER_COLOR = '#ced4da';

const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const formStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
  };
  
  const inputContainerStyle = {
    width: '100%', // Set width to 100%
  };

  const inputStyle = {
    border: `1px solid ${INPUT_BORDER_COLOR}`,
    borderRadius: '0',
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%', // Set width to 100%
  };

  const registerButtonStyle = {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
    color: TEXT_COLOR_WHITE,
    fontWeight: 'bold',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
    marginTop: '1rem',
    width: '100%',
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;
      await axios.post(url, data);
      navigate("/loginPage");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <Form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'left', marginBottom: '2rem', marginLeft: '0' }}>Register</h2>
        <div style={inputContainerStyle}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={inputStyle}
            />
          </Form.Group>
        </div>
        <div style={inputContainerStyle}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter email"
              style={inputStyle}
            />
          </Form.Group>
        </div>
        <div style={inputContainerStyle}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              style={inputStyle}
            />
          </Form.Group>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <Button type="submit" style={registerButtonStyle}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
