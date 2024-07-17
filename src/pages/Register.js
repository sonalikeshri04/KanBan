import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Register.css'; // Import external CSS file

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [registered, setRegistered] = useState(false);

    const { username, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Password matching validation
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Email format validation (basic regex check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format');
            return;
        }

        // Mock API or localStorage handling (replace with actual backend integration)
        // For demo purposes, storing user data in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('Email already registered');
            return;
        }

        // Store user data in localStorage
        const newUser = { username, email, password };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));

        // Set registered state to true to trigger redirection
        setRegistered(true);
    };

    // Redirect after successful registration
    if (registered) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="register-container">
            <h2 className="register-heading">Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label className="label">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label className="label">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        className="input"
                        minLength="6"
                        required
                    />
                </div>
                <button type="submit" className="button">Register</button>
            </form>
        </div>
    );
};

export default Register;
