import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { apiGetStoreItems, apiLogin, apiVerifyAuth, apiLogout, apiRegister, apiAddToCart, apiGetCart } from './services/api';

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
    const [cartItemTotal, setCartItemTotal] = useState(0);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [userName, setUserName] = useState('');

    const stateProps = {
        storeItems,
        cart,
        cartItemTotal,
        error,
        isLoggedIn,
        setIsLoggedIn,
        isModalOpen,
        setIsModalOpen,
        isRegister,
        setIsRegister,
        userName,
        setUserName,
    };
    
    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);
            if (response.success) {
                //login success
                setIsLoggedIn(true);
                setIsModalOpen(false);
                setUserName(`${response.data.first_name} ${response.data.last_name}`);
            } else {
                //login failed
                throw new Error(response.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await apiLogout();
            if (response.success) {
                setIsLoggedIn(false);
                setUserName('');
            } else {            
                throw new Error(response.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    // fetch store items
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await apiGetStoreItems();
                setStoreItems(items);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        const checkAuthAndFetchCart = async () => {
            try {
                const authResponse = await apiVerifyAuth();
                setIsLoggedIn(authResponse.success);

                if (authResponse.success) {
                    const response = await apiGetCart();
                    setCart(response);
                    setCartItemTotal(response.length);
                    setUserName(`${authResponse.data.first_name} ${authResponse.data.last_name}`);
                } else {
                    setCart([]);
                    setCartItemTotal(0);
                }
                

            } catch (error) {
                setError(error.message);
            }
        };
    
        checkAuthAndFetchCart();
    }, [isLoggedIn]);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className="headerContainer">
                        <Header logout={logout} {...stateProps} />
                    </div>
                </header>
                <section className="App-body">
                    {error && <div className="error">{error}</div>}
                    <Routes>
                        <Route exact path="/" element={<Home items={storeItems} />} />
                        <Route path="/product/:id" element={<Product 
                            addItemToCart={apiAddToCart} 
                            setCart={setCart} 
                            getCart={apiGetCart} 
                            setCartItemTotal={setCartItemTotal}
                            />} />
                        <Route path="/cart" element={<Cart cart={cart}/>} />
                    </Routes>
                </section>
                <footer>
                    {/* Add your footer content here */}
                </footer>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {isRegister ? (
                        <Register register={apiRegister} toggleRegister={() => setIsRegister(false)}/>    
                    ) : (
                        <Login login={login} toggleRegister={() => setIsRegister(true)}/>
                    )}
                </Modal>
                
            </div>
        </Router>
    );
}

export default App;