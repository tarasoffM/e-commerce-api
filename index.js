require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

// set the view engine to ejs
app.set('view-engine', 'ejs');

// configure passport
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
const authQueries = require('./queries/auth');
const orderQueries = require('./queries/order');
const { get } = require('http');
db = {
    ...customerQueries,
    ...productQueries,
    ...cartQueries,
    ...authQueries,
    ...orderQueries
};

// initialize session and passport
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
app.get('/profile', checkAuthenticated, (req, res) => {
    res.render('profile.ejs', { first_name: req.user.first_name, last_name: req.user.last_name });
});
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});


// authentication routes
app.post('/register', checkNotAuthenticated, (req, res) => {db.regCustomer(req, res);});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
}));
app.get('/logout', checkAuthenticated, (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.redirect('/profile');
        }
        res.redirect('/login');
    });    
});

// routes for customer endpoints
app.get('/customer', (req, res) => {db.getCustomers(req, res);});
app.get('/customer/:id', (req, res) => {db.getCustomerById(req, res);});
app.put('/customer/:id', (req, res) => {db.updateCustomer(req, res);});
app.delete('/customer/:id', (req, res) => {db.deleteCustomer(req, res);});

// routes for product endpoints
app.get('/products', (req, res) => {db.getProducts(req, res);});
app.get('/products/:id', (req, res) => {db.getProductById(req, res);});

// routes for cart endpoints
app.get('/cart/:id', (req, res) => {db.getCartById(req, res);});
app.post('/cart', (req, res) => {db.addToCart(req, res);});
app.delete('/cart/:id', (req, res) => {db.deleteFromCart(req, res);});

// routes for order endpoints
app.get('/order', (req, res) => {db.getOrders(req, res);});
app.get('/order/:id', (req, res) => {db.getOrderById(req, res);});
app.post('/order', (req, res) => {db.addOrder(req, res);});

// routes for checkout
app.get('/checkout', async (req, res) => {
    cart = await db.getCartById(req, res);
    console.log(cart);
    res.render('checkout.ejs', {cart: cart});
});
app.post('/checkout', (req, res) => {});


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next();
}


// initialize the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});