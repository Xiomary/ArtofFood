import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDelete = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend when component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getAll`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/deleteUserById/${userId}`);
      // Remove the deleted user from the list
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="user-cards">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDelete;
