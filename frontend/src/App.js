import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getStoreItems, login, logout, register } from './services/api';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Modal from './components/Modal';

const URL = 'http://localhost:3000';

function App() {
    const [storeItems, setStoreItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const stateProps = {
        storeItems,
        cart,
        error,
        isLoggedIn,
        setIsLoggedIn,
        isModalOpen,
        setIsModalOpen,
        isRegister,
        setIsRegister,
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
                        <Header 
                            setModal={() => {
                                setIsModalOpen(true);
                                setIsRegister(false);
                            }}
                            {...stateProps}
                        />
                    </div>
                </header>
                <section className="App-body">
                    {error && <div className="error">{error}</div>}
                    <Routes>
                        <Route exact path="/" element={<Home items={storeItems} />} />
                        <Route path="/login" element={<Login login={(email, password) => {
                            login(email, password);
                            setIsLoggedIn(true);
                        }} />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </section>
                <footer>
                    {/* Add your footer content here */}
                </footer>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen()}>
                    {isRegister ? (
                        <Register register={register} toggleRegister={() => setIsRegister(false)} />    
                    ) : (
                        <Login login={login} {...stateProps} />
                    )}
                </Modal>
                
            </div>
        </Router>
    );
}

export default App;