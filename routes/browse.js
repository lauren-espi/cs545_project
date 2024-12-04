import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import recipeFunc from '../data/recipes.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the JSON file
async function loadRecipes() {
    const data = await fs.readFile(join(__dirname, '../data/recipes.json'), 'utf-8');
    return JSON.parse(data);
}

router.route('/')
    .get(async (req, res) => {
        try {
            const recipes = await loadRecipes();
            
            // Get list of allergies
            const allergens = recipeFunc.getSortedAllergyFrequencies(recipes);

            // Get list of cuisines
            const cuisines = recipeFunc.getSortedPlaceFrequencies(recipes);

            // Render the 'browse' view with the JSON data
            res.render('browse', { pageTitle: "Browse Recipes", recipes: recipes, allergens, cuisines });
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });

router.route('/recipe/:recipeId')
    .get(async (req, res) => {
        console.log("browser here")
        try {
            const recipes = await loadRecipes();
            
            // Fetch recipe from params
            const recipe = recipes.find(obj => obj.recipeId === req.params.recipeId);
            if (recipe) {
                res.render('view', { pageTitle: recipe.recipeName, recipe: recipe });
            } else {
                res.status(404).json({ error: 'Recipe not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });

router.route('/filters/:place')
    .get(async (req, res) => {
        try {
            const recipes = await loadRecipes();

            const filtered = recipes.filter(recipe => recipe.place === req.params.place);
    
            // Get list of allergies
            const allergens = recipeFunc.getSortedAllergyFrequencies(recipes);
    
            // Get list of cuisines
            const cuisines = recipeFunc.getSortedPlaceFrequencies(recipes);
    
            // Render the 'browse' view with the JSON data
            res.render('browse', { pageTitle: "Browse Recipes", recipes: filtered, allergens, cuisines });
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });

export default router;