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

router.route('/:recipeId')
  .get(async (req, res) => {
      try {
          const recipes = await loadRecipes(); 
          const recipe = recipes.find(r => r.recipeId === req.params.recipeId);
          
          if (recipe) {
              res.render('view', {pageTitle: recipe.recipeName, recipeName: recipe.recipeName, image_url: recipe.image_url, icons: recipe.icons, allergens_free: recipe.allergens_free, place: recipe.place, ingredients: recipe.ingredients, instructions: recipe.instructions});
          } else {
              res.status(404).json({ error: 'Recipe not found' });
          }
      } catch (e) {
          console.error(e);
          res.status(500).json({ error: 'Error fetching recipe' });
      }
  });

export default router;
