import React from 'react';

const getStoreItems = async () => {
    try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch store items: ${response.status}`);
    }

    const data = await response.json();
    return data;
} catch (error) {
    console.error('Error fetching store items:', error);
    return [];
}
};

export default getStoreItems;