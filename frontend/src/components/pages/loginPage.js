import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import getUserInfo from '../../utilities/decodeJwt';

const PRIMARY_COLOR = '#f0ad4e';
const INPUT_BORDER_COLOR = '#ced4da';
const url = 'http://localhost:8081/user/login';

const Login = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Adjusted the maxWidth for a bigger form and increased padding
  const cardStyle = {
    maxWidth: '500px', // Increased from 400px to 500px
    margin: 'auto',
    padding: '3rem', // Increased padding for a bigger look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: '8px',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  };

  const backgroundImageUrl = '/images/geometric-background.jpeg';

  const inputStyle = {
    border: `1px solid ${INPUT_BORDER_COLOR}`,
    borderRadius: '20px',
    marginBottom: '1rem',
  };

  const buttonStyling = {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
    marginTop: '1rem',
    display: 'block',
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
    <div style={{ height: '100vh', background: `url(${backgroundImageUrl}) center / cover no-repeat` }}>
      <Form style={cardStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h2> {/* Added Login heading */}
        <Form.Group controlId='formBasicEmail'>
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
          <Form.Control
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
            placeholder='Password'
            style={inputStyle}
          />
        </Form.Group>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button type='submit' style={buttonStyling}>
          Log In
        </Button>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to='/signup'>Don't have an account? Sign up</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
