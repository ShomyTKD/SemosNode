const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

const MONGODB_URI = "mongodb+srv://mihajlorusanj:Ut1W3kbHkrAoX9F1@semosstudy.mg2banl.mongodb.net/UsersValidateDatabase?retryWrites=true&w=majority&appName=SemosStudy";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Konektovan'))
    .catch(err => console.log('Neuspela konekcija: ' + err));

// Middleware za parsiranje JSON podataka
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});