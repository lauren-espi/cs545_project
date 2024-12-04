import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import recipeFunc from '../data/recipes.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadRecipes() {
    const data = await fs.readFile(join(__dirname, '../data/recipes.json'), 'utf-8');
    return JSON.parse(data);
}

router.route('/cuisine/:place')
    .get(async (req, res) => {
        try {
            const recipes = await loadRecipes();
            
            const filterPlace = req.params.place.trim().toLowerCase();
            const filtered = recipes.filter(recipe => recipe.place && recipe.place.trim().toLowerCase() === filterPlace);

            const allergens = recipeFunc.getSortedAllergyFrequencies(recipes);
            const cuisines = recipeFunc.getSortedPlaceFrequencies(recipes);

            res.render('browse', { pageTitle: "Browse Recipes", recipetypes: `Recipes from ${req.params.place}`, recipes: filtered, allergens, cuisines });
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });

router.route('/allergen/:allergens')
    .get(async (req, res) => {
        try {
            const recipes = await loadRecipes();
            
            // Trim and lowercase the allergen from the URL parameter
            const filterAllergen = req.params.allergens.trim().toLowerCase();
            
            // Filter the recipes where the allergens_free array contains the specified allergen
            const filtered = recipes.filter(recipe =>
                recipe.allergens_free.some(allergen => allergen.toLowerCase() === filterAllergen)
            );

            // Get allergens and cuisines for the sidebar
            const allergens = recipeFunc.getSortedAllergyFrequencies(recipes);
            const cuisines = recipeFunc.getSortedPlaceFrequencies(recipes);

            // Render the 'browse' view with the filtered recipes
            res.render('browse', { pageTitle: "Browse Recipes", recipetypes: `Recipes free from ${req.params.allergens}`, recipes: filtered, allergens, cuisines });
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });


router.route('/:searchTerm')
    .get(async (req, res) => {
        try {
            const searchTerm = req.params.searchTerm.trim().toLowerCase();
            const recipes = await loadRecipes();

            // Filter recipes where the recipe name contains the search term
            const filteredRecipes = recipes.filter(recipe =>
                recipe.recipeName.toLowerCase().includes(searchTerm)
            );

            // Get allergens and cuisines for the sidebar
            const allergens = recipeFunc.getSortedAllergyFrequencies(recipes);
            const cuisines = recipeFunc.getSortedPlaceFrequencies(recipes);

            // Render the browse view with the filtered recipes
            res.render('browse', {
                pageTitle: "Search",
                recipetypes: `Search Results for "${req.params.searchTerm}"`,
                recipes: filteredRecipes,
                allergens,
                cuisines
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal server error' });
        }
    });



export default router;