// Učitavanje .env require()
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const registerUser = require('./auth/auth-service');
const User = require('./models/User');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Error connecting to MongoDB', err);
    });

app.post('/register', async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json({ message: 'User successfully created, check your email for verification link' });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
})

app.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified' });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
})

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})
