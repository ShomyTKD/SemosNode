const recipesModel = require('../models/recipesModel');

async function getRecipes(req, res) {
    const recipes = await recipesModel.getAllRecipes();
    res.render('recipes', { recipes });
}

async function createRecipe(req, res) {
    const { recipeName, ingredients } = req.body;
    const newRecipe = { recipeName, ingredients };

    // Validacija
    let recipes = await recipesModel.getAllRecipes();
    const recipeExists = recipes.some(recipe => recipe.recipeName === recipeName);

    if (recipeExists) {
        res.render('add-recipe', { error: 'Recept već postoji', newRecipe: newRecipe })
    } else {
        recipes.push(newRecipe);
        await recipesModel.saveRecipes(recipes);
        res.redirect('/recipes');
    }
}

module.exports = {
    getRecipes,
    createRecipe
}