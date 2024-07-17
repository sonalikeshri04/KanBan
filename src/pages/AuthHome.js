import React from 'react';
import { Link } from 'react-router-dom';

const AuthHome = () => {
  const loggedIn = localStorage.getItem('loggedIn');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'url(./images/519279.jpg) no-repeat center center/cover' }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Welcome to Your Kanban App</h1>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center' }}>
          <li style={{ margin: '0 10px' }}>
            <Link to="/boards" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', display: 'inline-block' }}>Boards</Link>
          </li>
          <li style={{ margin: '0 10px' }}>
            <Link to="/logout" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', display: 'inline-block' }}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AuthHome;
