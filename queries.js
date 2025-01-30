// Description: This file is used to load the environment variables from the .env file.
require('dotenv').config();

// create database connection pool
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const newCustomer = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    pool.query('INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, email, password], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
    });
};

const getCustomer = (req, res) => {
    pool.query('SELECT first_name, last_name, email FROM customer ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

module.exports = {
    newCustomer,
    getCustomer
};