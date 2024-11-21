import express from 'express';

const router = express.Router();

// Route for the home page
router.route('/')
    .get(async (req, res) => {
        try {
            res.render('create', { pageTitle: "Create a Recipe" });
        } catch (e) {
            console.error(e);
            res.status(404).json({ error: 'Not found' });
        }
    });

export default router;
