import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getStoreItems, login, register } from './services/api';

import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Product from './pages/Product';
import Modal from './components/Modal';

const URL = 'http://localhost:3000';

function App() {
    const [storeItems, setStoreItems] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

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
                    {isRegister ? (
                        <Register register={register} toggleRegister={() => setIsRegister(false)} />    
                    ) : (
                        <Login login={login} toggleRegister={() => setIsRegister(true)} />
                    )}
                </Modal>
                
            </div>
        </Router>
    );
}

export default App;