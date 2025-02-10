import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import './Product.css';

const Product = ({ addItemToCart, getCart, setCart, setCartItemTotal }) => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const handleAddToCart = async (event) => {
        try {
            event.preventDefault();
            const response = await addItemToCart(product.id, 1);
            if (response) {
                const newCart = await getCart();
                setCart(newCart);
                setCartItemTotal(newCart.length);
                
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setProduct(product[0]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="product">
            <img src={`${process.env.REACT_APP_BASE_URL}${product.image}`} alt={product.name} className="product-img" />
            <hr />
            <div className="product-content">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={() => navigate('/')} >Back to Store</button>   
            </div>
        </div>
    );
}

export default Product;