const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express(); // Inicijalizacija express servera
const PORT = 3000; // Port na kome će naš server osluškivati zahteve

app.set('view engine', 'ejs'); // Prosleđujemo expressu sa kojim 'engine' za view radimo
app.set('views', path.join(__dirname, 'views')); // Setujemo direktorijum za ejs šablone
app.set(express.static(path.join(__dirname, 'public'))); // Middleware za statične fajlove
app.use(express.urlencoded({ extended: true })); // Middleware koji dozvoljava rad sa URL-encoded podacima sa forme

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-user', (req, res) => {
    res.render('add-user', { error: null });
});

app.post('/add-user', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const newUser = { firstName, lastName, email };

    // Validacija podataka
    let users = await readUsers();
    const userExist = users.some(user => user.firstName === firstName && user.lastName === lastName);

    if (userExist) {
        res.render('add-user', { error: 'Korisnik već postoji', newUser: newUser })
    } else {
        users.push(newUser);
        await saveUsers(users);
        res.redirect('/users');
    }
});

app.get('/users', async (req, res) => {
    const users = await readUsers();
    res.render('users', { users });
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});

// Funkcija koja cita korisnike iz fajla
async function readUsers() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf-8');
        return JSON.parse(data); // Parsing JSON data
    } catch (err) {
        if (err.code === 'ENOENT') {
            return []; // Returning an empty array if the file does not exist
        }
        throw err; // Throwing the error if it's not a file not found error
    }
}

// Funkcija koja snima korisnika u fajla
async function saveUsers(users) {
    await fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), 'utf-8');
}