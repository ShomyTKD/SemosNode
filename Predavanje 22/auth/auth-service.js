require('dotenv').config();
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const generateHTML = require('../email/generate-html');
const User = require('../models/User');

const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

// Primer HTML templatea
const emailTemplate = `
    <h1>Welcome, {{ name }} !</h1>
    <p>Please click the button below to verify your email</p>
    <a href={{ verificationLink }}>Verify your email</a>
`;

async function registerUser(userData) {
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    const verificationToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;
    const emailHTML = generateHTML(emailTemplate, { name, verificationLink });

    const data = {
        from: 'Your App <noreply@yourDomain.com>',
        to: email,
        subject: 'Verify your email',
        html: emailHTML
    }

    await mg.messages().send(data);

    return newUser;
};

module.exports = registerUser;