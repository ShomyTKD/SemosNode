const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const albumRouter = require('./routes/albums');

const app = express();
const port = 3000;

const MONGODB_URI = "mongodb+srv://mihajlorusanj:Ut1W3kbHkrAoX9F1@semosstudy.mg2banl.mongodb.net/Albums?retryWrites=true&w=majority&appName=SemosStudy";

mongoose.connect(MONGODB_URI, {})
    .then(() => console.log('Connected'))
    .catch(err => console.log('Connection failed: ' + err));

// Middleware
app.use(bodyParser.json());

app.use('/albums', albumRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})