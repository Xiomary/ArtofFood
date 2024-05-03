import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import getUserInfo from '../../utilities/decodeJwt';

const PRIMARY_COLOR = '#0056b3'; 
const SECONDARY_COLOR = '#f0f0f0'; 
const TEXT_COLOR_BLACK = '#000';
const TEXT_COLOR_WHITE = '#fff'; 
const INPUT_BORDER_COLOR = '#ced4da';
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  const inputStyle = {
    border: `1px solid ${INPUT_BORDER_COLOR}`,
    borderRadius: '0',
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
  };

  const loginButtonStyle = {
    backgroundColor: SECONDARY_COLOR,
    borderColor: SECONDARY_COLOR,
    color: TEXT_COLOR_BLACK,
    fontWeight: 'bold',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
    marginTop: '1rem',
    width: '100%', 
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

  useEffect(() => {
    const userInfo = getUserInfo(localStorage.getItem('accessToken'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/homePage');
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('accessToken', res.accessToken);
      navigate('/homePage');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  

  if (user) {
    navigate('/homePage');
    return null;
  }

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign in to your account</h2>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label style={{ color: TEXT_COLOR_BLACK }}>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={data.username}
              onChange={handleChange}
              placeholder='Enter username'
              style={inputStyle}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label style={{ color: TEXT_COLOR_BLACK }}>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              placeholder='Password'
              style={inputStyle}
            />
          </Form.Group>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <Button type='submit' style={loginButtonStyle}>
            Login
          </Button>
          <Button type='button' style={registerButtonStyle} as={Link} to='/signup'>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
