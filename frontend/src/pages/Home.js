/*
import React from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import './Home.css';


const Home = ({ items, handleClick }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="store">
        {items.map(
            (item) => (
                <Card key={item.id} 
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                handleClick={() => handleCardClick(item.id)} 
                />
            )
        )}
        </div>
    );
    };
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiAddToCart, apiGetCart } from '../services/api';
import './Home.css';

const URL = process.env.REACT_APP_BASE_URL;

function Home({ items, cart, cartItemTotal, isLoggedIn, setIsModalOpen }) {
  const [heroIndex, setHeroIndex] = useState(0);

  // Rotate hero index every 5s, looping through 3 images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 3);
    }, 5000); // 5-second interval
    return () => clearInterval(interval);
  }, []);

  // Use first 3 items for hero (adjust if items have a 'heroImage' field)
  const heroItems = items.slice(0, 3);
  const featuredItems = items.slice(0, 4); // Top 4 for featured grid
  const newArrivals = items.filter(item => item.isNew).slice(0, 5); // Adjust filter as needed

  return (
    <div className="home">
        <div className="hero-container">
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-slider">
                {heroItems.length > 0 && heroItems.map((item, index) => (
                    <img
                    key={item.id}
                    src={URL + item.image} // Assumes items have an 'image' field
                    alt={item.name}
                    className={`hero-image ${index === heroIndex ? 'active' : ''}`}
                    />
                ))}
                <div className="hero-text">
                    <h1>Shop the Best Deals</h1>
                    <Link to="/shop" className="hero-btn">Browse All</Link>
                </div>
                </div>
            </section>
        </div>
        
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredItems.map(item => (
            <div key={item.id} className="product-card">
              <Link to={`/product/${item.id}`}>
                <img src={URL + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}</p>
              </Link>
              <button onClick={() => apiAddToCart(item.id).then(() => apiGetCart())}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="carousel">
          {newArrivals.map(item => (
            <div key={item.id} className="carousel-item">
              <Link to={`/product/${item.id}`}>
                <img src={URL + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h3>Join Our Community</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>
    </div>
  );
}


export default Home;