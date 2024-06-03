const fs = require('fs').promises;
const filePath = './recipes.json';

const getAllRecipes = () => {
    return fs.readFile(filePath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(err => {
            if (err.code === 'ENOENT') return [];
            throw err;
        });
}

const saveRecipes = (recipes) => {
    return fs.writeFile(filePath, JSON.stringify(recipes, null, 2), 'utf8')
        .catch(err => { throw err; });
}

module.exports = {
    getAllRecipes,
    saveRecipes
}