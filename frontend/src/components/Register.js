import React, { useState } from 'react';

const Register = ({ toggleRegister, register }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        register(first_name, last_name, email, password);
    };        

    return (
        <div className="auth-container">
            <h1>Register</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text"
                    id="first_name" 
                    name="first_name"
                    value={first_name} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required />
                <br />
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text"
                    id="last_name" 
                    name="last_name"
                    value={last_name} 
                    onChange={(e) => setLastName(e.target.value)}
                    required />
                <br />
                <label htmlFor="email">Email Address</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <br />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <br />
                <label htmlFor="password">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                <br />
                <button type="submit" className="submit-button">Register</button>
                <button type="button" onClick={toggleRegister} className="toggle-button">Sign in with existing account</button>
            </form>
        </div>
    );
};

export default Register;