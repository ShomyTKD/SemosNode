// odredjuje koji cemo model vratiti uz pomoc handlera i u njega se stavlja biznis logika

const contactsModel = require('../models/contactsModel');

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

module.exports = {
    getContacts,
    createContact
}