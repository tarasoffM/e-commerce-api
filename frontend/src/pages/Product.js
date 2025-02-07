import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import './Product.css';

const Product = ({ addItemToCart }) => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const handleAddToCart = async (event) => {
        event.preventDefault();
        const response = await addItemToCart(product.id, 1);
        alert(response.message);
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
            <img src={`${process.env.REACT_APP_BASE_URL}${product.image}`} alt={product.name} />
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