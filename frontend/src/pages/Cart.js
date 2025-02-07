import React from 'react';

const Cart = ({ cart }) => {
    return (
        <div>
        <h2>Cart</h2>
        <ul>
            {cart.map((item, index) => {
            return <li key={index}>{item.name}</li>;
            })}
        </ul>
        </div>
    );
};

export default Cart;