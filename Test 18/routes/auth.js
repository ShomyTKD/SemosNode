const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const JWTData = require('../config/JWT_SECRET');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Email or password is incorrect1');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Email or password is incorrect2');
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, JWTData.JWT_SECRET, { expiresIn: '45m' });
        await user.save();
        res.send(token);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).send('Email, password, and role are required');
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('Email already exists');
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.send('User registered successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;