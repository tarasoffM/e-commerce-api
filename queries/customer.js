const pool = require('../db.js');

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

const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

module.exports = {
    newCustomer,
    getCustomerById
};