import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
    return (
        <div>
        <img src="/images/cart.png" className="cart-icon" />
        <ul>
            {cart.map((item, index) => {
            return <li key={index}>{item.name}</li>;
            })}
        </ul>
        </div>
    );
};

export default Cart;
