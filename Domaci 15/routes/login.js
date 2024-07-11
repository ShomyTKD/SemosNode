const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

// Forgot password and password reset routes

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        res.status(200).send(resetToken);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/reset-password/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).send('Password has been reset successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;