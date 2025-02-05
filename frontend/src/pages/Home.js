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

export default Home;