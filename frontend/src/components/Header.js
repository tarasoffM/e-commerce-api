import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const URL = process.env.REACT_APP_BASE_URL;

const Header = ({ isLoggedIn, logout, setIsModalOpen, setIsRegister, cartItemTotal, userName }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLoginClick = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      logout();
    } else {
      setIsModalOpen(true);
      setIsRegister(false);
    }
  };

  return (
    <header className="header sticky">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          {<img src={URL + '/public/images/Logo01.png'} alt="Matt's E-Shop" />}
        </Link>

        {/* Navigation */}
        <nav className={`nav ${isMobileNavOpen ? 'open' : ''}`}>
          <button className="hamburger" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
            ☰
          </button>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <div className="action-icons">
            <span className="search-icon">🔍</span>
            <Link to="/cart" className="cart-icon">
              <img src="/images/cart.png" alt="Cart" />
              {cartItemTotal > 0 && <span className="cart-badge">{cartItemTotal}</span>}
            </Link>
          </div>
          <div className="user-actions">
            {isLoggedIn ? (
              <>
                <span className="user-name">Welcome, {userName}</span>
                <button onClick={handleLoginClick} className="logout-btn">Logout</button>
              </>
            ) : (
              <button onClick={handleLoginClick} className="login-btn">Sign In</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;