const express = require('express');
const recipesRoutes = require('./routes/recipesRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

// Engine i Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public'))); // Statični fajlovi
app.use(express.urlencoded({ extended: true }));

app.use('/', recipesRoutes);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});