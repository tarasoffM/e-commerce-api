const pool = require('../db.js');

// get all customers - query will need to be adjusted to include relevant details
const getCustomers = (req, res) => {
    pool.query('SELECT * FROM customer ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// get customer by id - query will need to be adjusted to include relevant details
const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// add new customer **WILL NEED TO UPDATE THIS TO SECURE PASSWORDS**
const newCustomer = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    pool.query('INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, email, password], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
    });
};

// update a customer by id
const updateCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, password } = req.body;

    pool.query('UPDATE customer SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5', [first_name, last_name, email, password, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Customer modified with ID: ${id}`);
    });
};

// delete a customer by id
const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Customer deleted with ID: ${id}`);
    });
};

module.exports = {
    getCustomers,
    getCustomerById,
    newCustomer,
    updateCustomer,
    deleteCustomer
};