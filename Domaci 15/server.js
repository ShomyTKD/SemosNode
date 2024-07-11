const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const db = require('./config/db');

const app = express();
const port = 3000;

// Middleware za parsiranje JSON podataka
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/validate', loginRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});