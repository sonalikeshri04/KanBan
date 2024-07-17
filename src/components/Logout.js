import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  localStorage.removeItem('loggedIn'); // Clear session data

  console.log("Logout successful"); // Example message

  return <Navigate to="/login" />;
};

export default Logout;
