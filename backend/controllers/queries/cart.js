const pool = require('../../models/db.js');

// gets all customer carts - query will need to be adjusted to include product details
const getCarts = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cart ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error getting carts:', error);
        res.status(500).send('An error occurred while retrieving carts');
    }
};

// gets cart by customer id - query will need to be adjusted to include product details
const getCart = async (req, res) => {
    // Check if req.user and req.user.id are present
    if (!req.user || !req.user.id) {
        return res.status(401).send('User not authenticated');
    }

    const id = parseInt(req.user.id);
    const query = `
        SELECT c.id AS customer, name, description, quantity, price
        FROM cart crt
        JOIN customer c
        ON c.id = crt.customer_id
        JOIN products p
        ON p.id = crt.product_id
        WHERE c.id = $1
    `;
    try {
        const results = await pool.query(query, [id]);
        console.log(results.rows);
        res.status(200).json(results.rows); 
    } catch (error) {
        console.error(`Error getting cart for customer ID ${id}:`, error);
        res.status(500).send('An error occurred while retrieving the cart');
    }
};

// add product to cart
const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const customer_id = req.user.id;

    try {
        const results = await pool.query('INSERT INTO cart (product_id, quantity, customer_id) VALUES ($1, $2, $3) RETURNING id', [product_id, quantity, customer_id]);
        res.status(201).json( { id: results.rows[0].id, product_id, quantity, customer_id });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('An error occurred while adding the product to the cart');
    }
};

// delete product from cart
const deleteFromCart = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM cart WHERE id = $1', [id]);
        res.status(200).send(`Product deleted from cart with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting product from cart with ID ${id}:`, error);
        res.status(500).send('An error occurred while deleting the product from the cart');
    }
};

module.exports = {
    getCarts,
    getCart,
    addToCart,
    deleteFromCart
};
