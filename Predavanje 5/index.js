const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// kupi json koji je parsovan kroz body
app.use(bodyParser.json())

app.use(function (req, res, next) {
    console.log(`${req.method} zahtev na ${req.url}`)
    next();
});

// za body parser
app.post('/userpost', (req, res) => {
    const newUser = req.body;
    res.status(201).send(`Korisnik kreairan: ${JSON.stringify(newUser)}`);
})

app.get('/', (req, res) => {
    res.send('Pocetak Expressa')
});

app.get('/kraj', (req, res) => {
    res.send('Kraj Expressa')
})

app.get('/kraj/:userId', (req, res) => {
    const userIdText = req.params.userId;
    res.send(`Korisnicki ID: ${userIdText}`);
})

app.get('/users', (req, res) => {
    console.log(req.query)
    const queryText = req.query.query;
    res.send(`Query: ${queryText}`);
})

app.get('/cause-error', (req, res, next) => {
    const err = new Error('Ovo je namerna greška')
    err.status = 500;
    next(err);
})

// Hvatanje grešaka uz pomoć next(err)
app.use((err, req, res, next) => { // Midleware bez rute
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

// Napraviti endpoint sa HTTP delete koja ce koristiti URL parameter (primer :userId) i vratiti koji je korisnik izbrisan

app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Korisnik sa ID-em ${userId} je obrisan!`);
});

// Middleware za hvatanje pogrešne rute
app.use((req, res, next) => {
    console.log(`${req.method} zahtev na ${req.url} - PROMAŠENA RUTA`)
    next()
})

app.listen(3000, () => {
    console.log('server radi na portu 3000');
})

/* Domaci
Prebacivanje prethodnog domaćeg u Express: kalkulator i konverzija Fh u Cs
tri rute:
1) jedna prima operaciju, podatak a i podatak b i u zavisnosti od operacije vraća rezultat
2) konverzija iz Fh u Cs
3) konverzija iz Cs u Fh
*/
