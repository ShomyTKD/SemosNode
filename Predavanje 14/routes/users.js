const express = require('express');
const router = express.Router();
const User = require('../models/user');


// Kreiranje novog korisnika (Create)
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Dohvatanje svih korisnika (Read)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Dohvatanje korisnika po ID-u (Read)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Korisnik nije pronadjen');
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Azuriranje korisnika po ID-u (Update)
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('Korisnik nije pronadjen');
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Brisanje korisnika po ID-u (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('Korisnik nije pronadjen');
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;