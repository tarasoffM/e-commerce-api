import React from 'react';
import Card from '../components/Card';
import './Home.css';


const Home = ({ items }) => {
    return (
        <div className="store">
        {items.map(
            (item) => (
                <Card key={item.id} 
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image} 
                />
            )
        )}
        </div>
    );
    };

export default Home;