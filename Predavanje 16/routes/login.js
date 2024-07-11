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
        const token = jwt.sign({ userId: user._id, role: user.role }, JWTData.JWT_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ userId: user._id, role: user.role }, JWTData.JWT_SECRET_REFRESH, { expiresIn: '7d' });

        user.refreshToken = refreshToken;
        await user.save();
        res.json({ token, refreshToken });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).send('Refresh token is required');
    }
    try {
        const decoded = jwt.verify(refreshToken, JWTData.JWT_SECRET_REFRESH);
        const user = await User.findOne(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(400).send('Invalid refresh token');
        }
        const newToken = jwt.sign({ userId: user._id, role: user.role }, JWTData.JWT_SECRET, { expiresIn: '10m' });
        const newRefreshToken = jwt.sign({ userId: user._id, role: user.role }, JWTData.JWT_SECRET_REFRESH, { expiresIn: '7d' });
        user.refreshToken = newRefreshToken;
        await user.save();
        res.json({ newToken, newRefreshToken });
    } catch (err) {
        return res.status(400).send('Invalid refresh token');
    }
});

module.exports = router;