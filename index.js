const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    db.getCustomer(req, res);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});