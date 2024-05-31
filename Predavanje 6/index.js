// prvi se pokrece

const express = require('express');

const app = express();

const contactsRoutes = require('./routes/contactsRoutes');

app.use(express.urlencoded({ extended: true }));

app.use('/api', contactsRoutes); // može biti i prazan string

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
})

/* Po istom principu (MVC) izraditi aplikaciju => Izrada aplikacije za čuvanje recepata