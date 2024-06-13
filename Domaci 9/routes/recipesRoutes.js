const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/add-recipe', function (req, res) {
    res.render('add-recipe', { error: null });
})

router.post('/add-recipe', recipesController.createRecipe);

router.get('/recipes', recipesController.getRecipes);

module.exports = router;