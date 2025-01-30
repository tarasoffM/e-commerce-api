const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// require routing handlers
const db = require('./queries');

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    db.getCustomer(req, res);
});

app.post('/customer', (req, res) => {
    db.newCustomer(req, res);
});

app.get('/products', (req, res) => {
    db.getProducts(req, res);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});