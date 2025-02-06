
export const login = async (email, password) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        alert(`Message: ${data.message}`);
    } else {
        throw new Error('Login failed');
    }
};

// register user
export const register = async (first_name, last_name, email, password) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
    });
    if (response.ok) {
        const data = await response.json();
        alert(`Message: ${data.message}`);
    } else {
        throw new Error('Registration failed');
    }
};

export const getStoreItems = async () => {
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

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return {};
    }
};

