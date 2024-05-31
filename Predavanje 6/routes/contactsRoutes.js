// rute služe samo za rute i za handlere

const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contactsController');

router.get('/contacts', contactsController.getContacts);

router.post('/contacts', contactsController.createContact);

module.exports = router;