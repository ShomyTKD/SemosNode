const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/recipes', recipesController.getRecipes);
router.post('/recipes', recipesController.createRecipe);

module.exports = router;