// prvi se pokrece

const express = require('express');

const app = express();

const contactsRoutes = require('./routes/contactsRoutes');

app.use(express.urlencoded({ extended: true }));

//Middleware za parsiranje URL kodiranih podataka iz formulara
app.use(express.json());

// Middleware za hvatanje pogrešne rute
app.use((req, res, next) => {
    console.log(`${req.method} zahtev na ${req.url}`)
    next()
})

app.use('/', contactsRoutes); // može biti i prazan string

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
})

/* Po istom principu (MVC) izraditi aplikaciju => Izrada aplikacije za čuvanje recepata */