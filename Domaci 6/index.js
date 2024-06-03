// import express i routes
const express = require('express');
const recipesRoutes = require('./routes/recipesRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/', recipesRoutes);

app.listen(3000, () => {
    console.log('Server starting on port 3000');
})
