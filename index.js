const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// require routing handlers
const customerQueries = require('./queries-customer');
const productQueries = require('./queries-products');
const cartQueries = require('./queries-cart');
const authQueries = require('./queries-auth');
db = {
    ...customerQueries,
    ...productQueries,
    ...cartQueries,
    ...authQueries
};

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    db.getHome(req, res);
});

app.post('/customer', (req, res) => {
    db.newCustomer(req, res);
});

app.get('/customer/:id', (req, res) => {
    db.getCustomerById(req, res);
});

app.get('/products', (req, res) => {
    db.getProducts(req, res);
});

app.post('/cart', (req, res) => {
    db.addToCart(req, res);
});

app.get('/cart/:id', (req, res) => {
    db.getCart(req, res);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});