// Load the environment variables from the .env file.
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

// basic welcome message for the root route - testing purposes
const getHome = (req, res) => {
    res.json({ info: 'Welcome to our store!' });
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

const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// get all products - this will be used to get all products from the database
const getProducts = (req, res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
 
   });
}

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
    newCustomer,
    getHome,
    getCustomerById,
    getProducts,
    addToCart,
    getCart
};