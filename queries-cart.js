const pool = require('./db.js');

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

const getCart = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM cart WHERE customer_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

module.exports = {
    addToCart,
    getCart
};