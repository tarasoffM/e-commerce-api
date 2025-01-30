const pool = require('../db.js');

// get all products - this will be used to get all products from the database
const getProducts = (req, res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
 
   });
};

// get product by id - this will be used to get a single product by id
const getProductById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// add new product - this will be used to add a new product to the database
const addProduct = (req, res) => {
    const { name, description, price } = req.body;

    pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id', [name, description, price], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Product added with ID: ${results.rows[0].id}`);
    });
};

// update a product by id - this will be used to update a product in the database
const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price } = req.body;

    pool.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4', [name, description, price, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product modified with ID: ${id}`);
    });
};

// delete a product by id - this will be used to delete a product from the database
const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product deleted with ID: ${id}`);
    });
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};