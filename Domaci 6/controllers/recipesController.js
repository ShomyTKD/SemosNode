const recipesModel = require('../models/recipesModel');

async function getRecipes(req, res) {
    try {
        const recipes = await recipesModel.getAllRecipes();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Neuspesno uzimanje recepata' });
    }
}

async function createRecipe(req, res) {
    try {
        const newRecipe = req.body;
        const recipes = await recipesModel.getAllRecipes();
        recipes.push(newRecipe);
        await recipesModel.saveRecipes(recipes);
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: 'Neuspesno čuvanje recepta' });
    }
}

module.exports = {
    getRecipes,
    createRecipe
}