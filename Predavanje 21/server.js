// Učitavanje .env require()
require('dotenv').config()

const mailgun = require('mailgun-js')

const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

const data = {
    from: 'Your App <noreply@yourDomain.com>',
    to: 'mihajlo.rusanj@hotmail.com',
    subject: 'Hello from Mailgun!',
    text: 'Testing Mailgun with Node.js is easy'
}

mg.messages().send(data, function (err, body) {
    if (err) {
        console.error(err);
    } else {
        console.log('Email sent: ', body);
    }
});