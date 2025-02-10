import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getStoreItems, login, verifyAuth, logout, register, addToCart, getCart } from './services/api';

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

    useEffect(() => {
        const checkAuthAndFetchCart = async () => {
            try {
                const authResult = await verifyAuth();
                setIsLoggedIn(authResult.success);

                if (authResult.success) {
                    const result = await getCart();
                    setCart(result);
                    setCartItemTotal(result.length);
                    setUserName(`${authResult.data.first_name} ${authResult.data.last_name}`);
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
                            addItemToCart={addToCart} 
                            setCart={setCart} 
                            getCart={getCart} 
                            setCartItemTotal={setCartItemTotal}
                            />} />
                        <Route path="/cart" element={<Cart cart={cart}/>} />
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