const express = require('express');
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://mihajlorusanj:Ut1W3kbHkrAoX9F1@semosstudy.mg2banl.mongodb.net/MyFirstDatabaseSemos?retryWrites=true&w=majority&appName=SemosStudy";

const app = express();

app.use(express.json());

const User = require('./models/UserMongoose');

// Konekcija ka bazi
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Konektovan'))
    .catch(err => console.log('Neuspela konekcija: ' + err));


app.post('/users', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/users/:id', (req, res) => {
    // Pronalaženje korisnika po ID-u
    User.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

app.put('/users/:id', (req, res) => {
    // Azuriranje podataka
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(user => {
            if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
            res.json({ message: 'Korisnik obrisan!' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server pokrenut!');
})