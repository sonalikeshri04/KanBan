import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 style={{'color':'white'}}>Welcome to Your Kanban Board</h1>
      <nav>
        <ul>
          <li ><Link to="/login" style={{'color':'white'}}>Login</Link></li>
          <li ><Link to="/register" style={{'color':'white'}}>Register</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
