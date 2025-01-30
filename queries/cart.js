const pool = require('../db.js');

// gets all customer carts - query will need to be adjusted to include product details
const getCarts = (req, res) => {
    pool.query('SELECT * FROM cart ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// gets cart by customer id - query will need to be adjusted to include product details
const getCart = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM cart WHERE customer_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// add product to cart
const addToCart = (req, res) => {
    const { product_id, quantity, customer_id } = req.body;

    pool.query('INSERT INTO cart (product_id, quantity, customer_id) VALUES ($1, $2, $3) RETURNING id', [product_id, quantity, customer_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Product added to cart with ID: ${results.rows[0].id}`);
    });
};

// delete product from cart
const deleteFromCart = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM cart WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product deleted from cart with ID: ${id}`);
    });
};

module.exports = {
    getCarts,
    getCart,
    addToCart,
    deleteFromCart
};