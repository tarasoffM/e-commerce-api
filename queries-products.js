const pool = require('./db.js');

// get all products - this will be used to get all products from the database
const getProducts = (req, res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
 
   });
}

module.exports = {
    getProducts
};