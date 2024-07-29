const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const db = require('./config/db');
const authService = require('./middleware/auth');

const app = express();
const port = 3000;

// Middleware za parsiranje JSON podataka
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', authService.authentificate, bookRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});