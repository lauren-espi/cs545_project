import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Route for the home page
router.route('/')
    .get(async (req, res) => {
        try {
            // Read and parse the JSON file
            const data = await fs.readFile(join(__dirname, '../data/recipes.json'), 'utf-8');
            const recipes = JSON.parse(data);

            // Render the 'browse' view with the JSON data
            res.render('browse', { pageTitle: "Browse Recipes", data: recipes });
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });

export default router;