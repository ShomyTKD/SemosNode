// rute služe samo za rute i za handlere

const express = require('express');
const path = require('path'); // uvoz modula za rad sa putanjama

const router = express.Router();

const contactsController = require('../controllers/contactsController');

router.get('/contacts', contactsController.getContacts);

router.post('/contacts', contactsController.createContact);

// Ažuriranje kontakta prema imenu
router.put('/contacts/update/:name', contactsController.updateContact);

// Brisanje kontakta prema imenu
router.delete('/contacts/remove/:name', contactsController.deleteContact);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
})

router.get('/new-contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/new-contact.html'));
})

router.get('/contacts.html', contactsController.renderContactsPage);

// __dirname + '/../views/form.html'
//       C://Desktop/SemosNode/routes/ + '../views/form.html'
//       C://Desktop/SemosNode/views/form.html

module.exports = router;