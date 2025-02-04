const pool = require('../../models/db.js');

// get all orders - this query will need to be adjusted to include relevant details
const getOrders = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM orders ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).send('An error occurred while retrieving orders');
    }
};

// get order by id - this query will need to be adjusted to include relevant details
const getOrderById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(`Error getting order with ID ${id}:`, error);
        res.status(500).send('An error occurred while retrieving the order');
    }
};

// add new order
const addOrder = async (req, res) => {
    const { customer_id, total } = req.body;

    try {
        const results = await pool.query('INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING id', [customer_id, total]);
        res.status(201).send(`Order added with ID: ${results.rows[0].id}`);
    } catch (error) {
        console.error('Error adding new order:', error);
        res.status(500).send('An error occurred while adding a new order');
    }
};

// update an order by id
const updateOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    const { customer_id, total } = req.body;

    try {
        await pool.query('UPDATE orders SET customer_id = $1, total = $2 WHERE id = $3', [customer_id, total, id]);
        res.status(200).send(`Order modified with ID: ${id}`);
    } catch (error) {
        console.error(`Error updating order with ID ${id}:`, error);
        res.status(500).send('An error occurred while updating the order');
    }
};

// delete an order by id
const deleteOrder = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM orders WHERE id = $1', [id]);
        res.status(200).send(`Order deleted with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${id}:`, error);
        res.status(500).send('An error occurred while deleting the order');
    }
};

module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
};