const express = require('express');
const router = express.Router();
const Album = require('../models/album');

// CRUD metoda (Create, Read, Update, Delete)

// Kreiranje novog albuma (Create)
router.post('/', async (req, res) => {
    try {
        const album = new Album(req.body);
        await album.save();
        res.status(201).send(album);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Dohvatanje svih albuma (Read All)
router.get('/', async (req, res) => {
    try {
        // Dinamično pretraživanje albuma
        let query = Album.find();

        if (req.query.name) {
            query = query.where('name').equals(req.query.name);
        }

        if (req.query.artist) {
            query = query.where('artist').equals(req.query.artist);
        }

        if (req.query.year) {
            query = query.where('year').equals(req.query.year);
        }

        query.then(albums => res.send(albums)).catch(err => res.status(500).json(err));
    } catch (err) {
        res.status(400).send(err);
    }
});

// Dohvatanje albuma po ID-u (Read)
router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id) // Mongoose pretraga po ID-u
        if (!album) return res.status(404).send('Album not found');
        res.send(album);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Azuriranje albuma po ID-u (Update)
router.put('/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!album) return res.status(404).send('Album not found');
        res.send(album);
    } catch (err) {
        res.status(400).send(err);
    }
})

// Brisanje albuma po ID-u (Delete)
router.delete('/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        if (!album) return res.status(404).send('Album not found');
        res.send(album);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;



/*
// Endpoint za filtriranje, ograničavanje broja vracenih i sortiranje
app.get('/filter', (req, res) => {
  let query = User.find();

 
  // Filtriranje prema query parametru (npr. age)
  if (req.query.age) {
      query = query.where('age').equals(req.query.age);
  }
 
  // Ograničavanje broja rezultata
  if (req.query.limit) {
      query = query.limit(parseInt(req.query.limit));
  }
 
  // Sortiranje rezultata
  if (req.query.sortBy) {
      let sortOrder = req.query.order === 'desc' ? -1 : 1;
      query = query.sort({ [req.query.sortBy]: sortOrder });
  }
// Filtriranje prema query parametru (npr. ageGreaterThan)
if (req.query.ageGreaterThan) {
  query = query.where('age').gt(parseInt(req.query.ageGreaterThan));
}
  query.then(users => res.json(users)).catch(err => res.status(500).json(err));
});
*/