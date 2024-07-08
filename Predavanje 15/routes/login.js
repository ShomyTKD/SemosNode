const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and Password are required');
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Email or Password is incorrect');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Email or Password is incorrect');
        }
        res.send('Logged in');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;