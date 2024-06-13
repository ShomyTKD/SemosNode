const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Engine i Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public'))); // Statični fajlovi
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-recipe', (req, res) => {
    res.render('add-recipe', { error: null });
});

app.post('/add-recipe', async (req, res) => {
    const { recipeName, ingredients } = req.body;
    const newRecipe = { recipeName, ingredients };

    // Validacija
    let recipes = await readRecipes();
    const recipeExists = recipes.some(recipe => recipe.recipeName === recipeName);

    if (recipeExists) {
        res.render('add-recipe', { error: 'Recept već postoji', newRecipe: newRecipe })
    } else {
        recipes.push(newRecipe);
        await saveRecipes(recipes);
        res.redirect('/recipes');
    }
});

app.get('/recipes', async (req, res) => {
    const recipes = await readRecipes();
    res.render('recipes', { recipes });
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

async function readRecipes() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'recipes.json'), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

async function saveRecipes(recipes) {
    await fs.writeFile(path.join(__dirname, 'recipes.json'), JSON.stringify(recipes, null, 2), 'utf-8');
}