const pool = require('./db.js');
const bcrypt = require('bcrypt');

const regCustomer = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await pool.query('INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, email, hashedPassword]);
        res.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
       
    } catch(err) {
        console.log('Error adding new customer:', err);
        res.status(500).send('An error occurred while adding a new customer');
    }
};

const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        pool.query('SELECT * FROM customer WHERE email = $1', [email], async (error, results) => {
            if (error) {}
        })

    } catch {
        res.status(500).send();
    }
};

module.exports = {
    regCustomer,
    loginCustomer
};