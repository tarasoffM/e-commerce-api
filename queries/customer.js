const pool = require('../db.js');
const bcrypt = require('bcrypt');

// get all customers - query will need to be adjusted to include relevant details
const getCustomers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM customer ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error getting customers:', error);
        res.status(500).send('An error occurred while retrieving customers');
    }
};

// get customer by id - query will need to be adjusted to include relevant details
const getCustomerById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query('SELECT * FROM customer WHERE id = $1', [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(`Error getting customer with ID ${id}:`, error);
        res.status(500).send('An error occurred while retrieving the customer');
    }
};

// add new customer **WILL NEED TO UPDATE THIS TO SECURE PASSWORDS**
const newCustomer = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const results = await pool.query('INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, email, password]);
        res.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
    } catch (err) {
        console.error('Error adding new customer:', err);
        res.status(500).send('An error occurred while adding a new customer');
    }
};

// update a customer by id
const updateCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query('UPDATE customer SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5', [first_name, last_name, email, hashedPassword, id]);
        res.status(200).send(`Customer modified with ID: ${id}`);
    } catch (error) {
        console.error(`Error updating customer with ID ${id}:`, error);
        res.status(500).send('An error occurred while updating the customer');
    }
};

// delete a customer by id
const deleteCustomer = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM customer WHERE id = $1', [id]);
        res.status(200).send(`Customer deleted with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting customer with ID ${id}:`, error);
        res.status(500).send('An error occurred while deleting the customer');
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    newCustomer,
    updateCustomer,
    deleteCustomer
};