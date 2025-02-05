import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLoginClick, cartItemCount }) => {
  return (
    <header className="headerContainer">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      <div className="header-actions">
        <button onClick={onLoginClick} className="login-button">
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        <Link to="/cart" className="cart-button">
          Cart ({cartItemCount})
        </Link>
      </div>
    </header>
  );
};

export default Header;