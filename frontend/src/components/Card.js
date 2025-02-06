import React from 'react';
import './Card.css';

const Card = ({ image, name, price, description, handleClick }) => {
  return (
    <div className="card" onClick={handleClick}>
      <img src={`${process.env.REACT_APP_BASE_URL}${image}`} alt={name} className="card-image" />
      <h3 className="card-title">{name}</h3>
      <p className="card-price">{price}</p>
    </div>
  );
}

export default Card;