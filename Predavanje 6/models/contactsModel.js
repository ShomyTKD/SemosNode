/* u modelu se inace nalaze klase

{
    name: string
    phone: string
}

koje predstavljaju ono sto hocu da dohvatim iz baze
*/

const fs = require('fs').promises;
const filepath = './contacts.json';

function getAllContacts() {
    return fs.readFile(filepath, 'utf-8')
        .then(data => JSON.parse(data))
        .catch(err => {
            if (err.code === 'ENOENT') return [];
            throw err;
        });
}

function saveContacts(contacts) {
    return fs.writeFile(filepath, JSON.stringify(contacts, null, 2), 'utf-8')
        .catch(err => { throw err });
}

module.exports = {
    getAllContacts,
    saveContacts
}