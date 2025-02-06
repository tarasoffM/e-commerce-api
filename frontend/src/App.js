import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getStoreItems } from './services/api';

import Home from './pages/Home';
import Login from './components/Login';
import Product from './pages/Product';
import Modal from './components/Modal';

const URL = 'http://localhost:3000';

function App() {
    const [storeItems, setStoreItems] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const login = async (email, password) => {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            alert(`Message: ${data.message}`);
        } else {
            throw new Error('Login failed');
        }
    };

    // fetch store items
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await getStoreItems();
                setStoreItems(items);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchItems();
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className="headerContainer">
                        <div className="login" onClick={() => setIsModalOpen(true)}>Login</div>
                    </div>
                </header>
                <section className="App-body">
                    {error && <div className="error">{error}</div>}
                    <Routes>
                        <Route exact path="/" element={<Home items={storeItems} />} />
                        <Route path="/login" element={<Login login={login} />} />
                        <Route path="/product/:id" element={<Product />} />
                    </Routes>
                </section>
                <footer>
                    {/* Add your footer content here */}
                </footer>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen()}>
                    <Login />
                </Modal>
                
            </div>
        </Router>
    );
}

export default App;