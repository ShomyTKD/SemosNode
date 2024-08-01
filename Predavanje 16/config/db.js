const mongoose = require('mongoose');

const dbname = 'UsersValidateDatabase';
const username = 'mihajlorusanj';
const password = 'Ut1W3kbHkrAoX9F1';

const MONGODB_URI = `mongodb+srv://${username}:${password}@semosstudy.mg2banl.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=SemosStudy`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Konektovan'))
    .catch(err => console.log('Neuspela konekcija: ' + err));

module.exports = mongoose;