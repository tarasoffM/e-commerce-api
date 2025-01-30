const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// require routing handlers
const customerQueries = require('./queries/customer');
const productQueries = require('./queries/products');
const cartQueries = require('./queries/cart');
const authQueries = require('./queries/auth');
const orderQueries = require('./queries/order');
db = {
    ...customerQueries,
    ...productQueries,
    ...cartQueries,
    ...authQueries,
    ...orderQueries
};

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


// basic welcome message for the root route - testing purposes
app.get('/', (req, res) => {res.json({ info: 'Welcome to our store!' });});

// routes for customer endpoints
app.get('/customer', (req, res) => {db.getCustomers(req, res);});
app.get('/customer/:id', (req, res) => {db.getCustomerById(req, res);});
app.post('/customer', (req, res) => {db.newCustomer(req, res);});
app.put('/customer/:id', (req, res) => {db.updateCustomer(req, res);});
app.delete('/customer/:id', (req, res) => {db.deleteCustomer(req, res);});

// routes for product endpoints
app.get('/products', (req, res) => {db.getProducts(req, res);});
app.get('/products/:id', (req, res) => {db.getProductById(req, res);});

// routes for cart endpoints
app.get('/cart/:id', (req, res) => {db.getCart(req, res);});
app.post('/cart', (req, res) => {db.addToCart(req, res);});
app.delete('/cart/:id', (req, res) => {db.deleteFromCart(req, res);});

// routes for order endpoints
app.get('/order', (req, res) => {db.getOrders(req, res);});
app.get('/order/:id', (req, res) => {db.getOrderById(req, res);});
app.post('/order', (req, res) => {db.addOrder(req, res);});

// routes for authentication endpoints

// initialize the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});