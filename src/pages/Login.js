import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css'; // Import external CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Set logged in state to true to trigger redirection or display logged-in UI
      setLoggedIn(true);
    } else {
      // Display an error message for invalid credentials
      alert('Invalid email or password');
    }
  };

  // Redirect after successful login
  if (loggedIn) {
    return <Navigate to="/auth-home" />;
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="input"
            minLength="6"
            required
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
