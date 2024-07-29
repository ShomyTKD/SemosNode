const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Kreiranje nove knjige (Create)
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Dohvatanje svih knjiga (Read)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({ user: req.userId }); // Multitenancy
        res.json(books);
    } catch (err) {
        res.status(500).json('Nema knjiga u databazi');
    }
})

// Dohvatanje knjige po ID-u (Read)
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Knjiga nije pronađena');
        }
        res.send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Azuriranje knjige po ID-u (Update)
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).send('Knjiga nije pronađena');
        }
        res.send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Brisanje knjige po ID-u (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send('Knjiga nije pronađena');
        }
        res.send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;