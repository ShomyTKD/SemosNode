const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const users = [
    { firstName: 'Zlatko', lastName: 'Hajdarevic', email: 'zlatko@gmail.com' },
    { firstName: 'Zarko', lastName: 'Mitic', email: 'zmitic@gmail.com' },
]

function hasDuplicateFirstNames(users) {
    const nameCounts = {};
    let duplicatedName = '';
    for (const user of users) {
        if (nameCounts[user.firstName]) {
            duplicatedName = user.firstName;
            return true, duplicatedName;
        } else {
            nameCounts[user.firstName] = 1;
        }
    }
    return false;
}

const isThereDuplicate = hasDuplicateFirstNames(users);

const appName = "My application";

app.get('/', (req, res) => {
    res.render('index', { users, appName, isThereDuplicate });
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})