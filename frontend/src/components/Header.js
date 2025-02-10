import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, logout, setIsModalOpen, setIsRegister, cartItemTotal, userName }) => {
  
  const handleLoginClick = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      // if user is logged in, log them out
      logout();
    } else {
      // if user is not logged in, open the modal
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
        <div className="user-info">
          {userName}
        </div>
        <div className="actions-row">
          <Link to="/cart" className="cart-button">
          <div className="cart-button-container">
             <img src="/images/cart.png" className="cart-icon" />
             <div className="cart-number" >{cartItemTotal}</div>
          </div>
          </Link>
          <button onClick={handleLoginClick} className="login-button">
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;