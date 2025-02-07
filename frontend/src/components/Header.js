import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn, logout, setIsModalOpen, setIsRegister, cartItemTotal }) => {
  
  const handleLoginClick = () => {
    if (isLoggedIn) {
      logout();
      setIsLoggedIn(false);
    } else {
      setIsModalOpen(true);
      setIsRegister(false);
    }
  };
  
  return (
    <header className="headerContainer">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
      </nav>
      <div className="header-actions">
        <Link to="/cart" className="cart-button">
          Cart {cartItemTotal}
        </Link>
        <button onClick={handleLoginClick} className="login-button">
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>

      </div>
    </header>
  );
};

export default Header;