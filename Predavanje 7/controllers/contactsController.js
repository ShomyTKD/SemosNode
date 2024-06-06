// odredjuje koji cemo model vratiti uz pomoc handlera i u njega se stavlja biznis logika

const contactsModel = require('../models/contactsModel');
const fs = require('fs').promises;
const path = require('path');

async function getContacts(req, res) {
    try {
        // pozivamo sve kontakte
        const contacts = await contactsModel.getAllContacts();
        // primer biznis logike:
        // necu da vratim inostrane brojeve telefona

        // vracamo listu kontakata kao odgovor
        res.json(contacts)
    }
    catch (err) {
        res.status(500).json({ error: 'Neuspesno hvatanje kontakata' });
    }
}

async function createContact(req, res) {
    try {
        // uzimamo podatke o novom kontaktu iz tela HTTP zahteva
        const newContact = req.body;
        // dobijamo trenutnu listu kontakata
        const contacts = await contactsModel.getAllContacts();
        // ubacujemo novi kontakt u listu
        contacts.push(newContact);
        // cuvamo kontakt
        await contactsModel.saveContacts(contacts);
        res.status(201).json(newContact);
    }
    catch (err) {
        res.status(500).json({ error: 'Neuspesno snimanje kontakta' });
    }
}

async function updateContact(req, res) {
    try {
        const name = req.params.name;
        const newPhone = req.body.phone;


        contactsModel.getAllContacts()
            .then(contacts => {
                const updatedContacts = contacts.map(contact => {
                    if (contact.name === name) {
                        contact.phone = newPhone;
                    }
                    return contact;
                });
                return contactsModel.saveContacts(updatedContacts);
            })
            .then(() => res.status(200).json({ message: 'Contact updated successfully' }))
            .catch(err => res.status(500).json({ error: err.message }));

    } catch (err) {
        res.status(500).json({ error: 'Failed to update contact' });
        // Ako dođe do greške, vraća se odgovor sa statusom 500 i porukom o grešci.
    }
};

async function deleteContact(req, res) {
    try {
        const name = req.params.name;
        contactsModel.getAllContacts()
            .then(contacts => {
                const updatedContacts = contacts.filter(contact => contact.name !== name);
                return contactsModel.saveContacts(updatedContacts);
            })
            .then(() => res.status(204).end())
            .catch(err => res.status(500).json({ error: err.message }));

    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact' });
        // Ako dođe do greške, vraća se odgovor sa statusom 500 i porukom o grešci.
    }
}

async function renderContactsPage(req, res) {
    contactsModel.getAllContacts()
        .then(contacts => {
            return fs.readFile(path.join(__dirname, '../views/contacts.html'), 'utf8')
                .then(template => {
                    let contactsListHtml = contacts.map(contact => `<li>Name: ${contact.name} - Phone: ${contact.phone}</li>`).join('');
                    let populatedHtml = template.replace('{{contactList}}', contactsListHtml);
                    res.send(populatedHtml);
                })
        }).catch(err => res.status(500).send(`Error loading dynamic contexts: ${err}`));
}


module.exports = {
    renderContactsPage,
    getContacts,
    createContact,
    updateContact,
    deleteContact
};