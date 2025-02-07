import React, { useState } from 'react';

const Login = ({ login, toggleRegister, setIsLoggedIn, setIsModalOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await login(email, password);
            setIsLoggedIn(result.success);
            if (result.success) {
                setIsModalOpen(false);
                //navigate('/profile'); // Redirect to profile page on successful login
            } else {
                alert(result.message); // Display the error message if login failed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Username:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
                <button type="button" onClick={toggleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Login;