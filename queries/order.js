const pool = require('../db.js');

// get all orders - this query will need to be adjusted to include relevant details
const getOrders = (req, res) => {
    pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// get order by id - this query will need to be adjusted to include relevant details
const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// add new order
const addOrder = (req, res) => {
    const { customer_id, total } = req.body;

    pool.query('INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING id', [customer_id, total], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Order added with ID: ${results.rows[0].id}`);
    });
};

// update an order by id
const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const { customer_id, total } = req.body;

    pool.query('UPDATE orders SET customer_id = $1, total = $2 WHERE id = $3', [customer_id, total, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Order modified with ID: ${id}`);
    });
};

// delete an order by id
const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Order deleted with ID: ${id}`);
    });
};

module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
};