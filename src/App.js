import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthHome from './pages/AuthHome';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './components/Logout';
import Boards from './components/Boards';
import Board from './components/Board';
import Home from './pages/Home'; // Update import path for Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home */}
        <Route path="/auth-home/*" element={<AuthHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
