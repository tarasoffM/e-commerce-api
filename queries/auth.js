const pool = require('../db.js');
const bcrypt = require('bcrypt');

const regCustomer = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await pool.query('INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, email, hashedPassword]);
        res.status(201).redirect('/login');       
    } catch(err) {
        console.log('Error adding new customer:', err);
        res.status(500).send('An error occurred while adding a new customer');
    }
};

const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const results = await pool.query('SELECT * FROM customer WHERE email = $1', [email])
        if (results.rows.length === 0) {
            return res.status(400).send('Cannot find user');
        }
    } catch {
        res.status(500).send();
    }
};

module.exports = {
    regCustomer,
    loginCustomer
};