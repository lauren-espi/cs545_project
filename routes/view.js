import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

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
          //make functions to: grab the allergens, cusine/place, ingredients and recipe 
          if (recipe) {
              res.render('view');
          } else {
              res.status(404).json({ error: 'Recipe not found' });
          }
      } catch (e) {
          console.error(e);
          res.status(500).json({ error: 'Error fetching recipe' });
      }
  });

export default router;

// import express from 'express';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Read and parse the JSON file
// async function loadRecipes() {
//     const data = await fs.readFile(join(__dirname, '../data/recipes.json'), 'utf-8');
//     return JSON.parse(data);
// }

// router.route('/')
//     .get(async (req, res) => {
//         try {
//             res.render('view', { pageTitle: "Create a Recipe" });
//         } catch (e) {
//             console.error(e);
//             res.status(404).json({ error: 'Not found!' });
//         }
//     });

// router.route('/recipe/:recipeId')
//     .get(async (req, res) => {
//         console.log("works in view.js")
//         try {
//             const recipes = await loadRecipes();
//             const recipe = recipes.find(obj => obj.recipeId === req.params.recipeId);

//             if (recipe) {
//                 console.log('Found Recipe:', recipe);
//                 res.render('view');
//             } else {
//                 res.status(404).json({ error: 'Recipe not found' });
//             }
//         } catch (e) {
//             console.error(e);
//             res.status(500).json({ error: 'Error getting recipe' });
//         }
//     });

// export default router;