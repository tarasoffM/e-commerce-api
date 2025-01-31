require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');


// initialize passport
const initializePassport = require('./passport-config');
initializePassport(passport);

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// require routing handlers
const customerQueries = require('./queries/customer');
const productQueries = require('./queries/products');
const cartQueries = require('./queries/cart');
const authQueries = require('./auth');
const orderQueries = require('./queries/order');
db = {
    ...customerQueries,
    ...productQueries,
    ...cartQueries,
    ...authQueries,
    ...orderQueries
};

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// ejs template engine
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/register', (req, res) => {
    res.render('register.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});


// authentication routes
app.post('/register', (req, res) => {db.regCustomer(req, res);});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

// routes for customer endpoints
app.get('/customer', (req, res) => {db.getCustomers(req, res);});
app.get('/customer/:id', (req, res) => {db.getCustomerById(req, res);});
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