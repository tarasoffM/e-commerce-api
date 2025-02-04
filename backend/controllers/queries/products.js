const pool = require('../../models/db.js');

// get all products - this will be used to get all products from the database
const getProducts = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM products ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).send('An error occurred while retrieving products');
    }
};

// get product by id - this will be used to get a single product by id
const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(`Error getting product with ID ${id}:`, error);
        res.status(500).send('An error occurred while retrieving the product');
    }
};

// add new product - this will be used to add a new product to the database
const addProduct = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const results = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id', [name, description, price]);
        res.status(201).send(`Product added with ID: ${results.rows[0].id}`);
    } catch (error) {
        console.error('Error adding new product:', error);
        res.status(500).send('An error occurred while adding a new product');
    }
};

// update a product by id - this will be used to update a product in the database
const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price } = req.body;

    try {
        await pool.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4', [name, description, price, id]);
        res.status(200).send(`Product modified with ID: ${id}`);
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        res.status(500).send('An error occurred while updating the product');
    }
};

// delete a product by id - this will be used to delete a product from the database
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.status(200).send(`Product deleted with ID: ${id}`);
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        res.status(500).send('An error occurred while deleting the product');
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};