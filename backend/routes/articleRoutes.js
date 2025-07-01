const express = require('express'); 
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByLocation,
  getArticlesByCategoryAndLocation,
  createArticle,
  updateArticleBySlug,
  deleteArticleBySlug  // ✅ DELETE controller added here
} = require('../controllers/articleController');

// CREATE
router.post('/', createArticle);

// UPDATE
router.put('/slug/:slug', updateArticleBySlug);

// DELETE
router.delete('/slug/:slug', deleteArticleBySlug); // ✅ DELETE route added

// GET by ID or Slug
router.get('/id/:id', getArticleById);
router.get('/slug/:slug', getArticleBySlug);

// Category & Location-specific fetches (⚠️ order matters)
router.get('/category/:category/location/:location', getArticlesByCategoryAndLocation);
router.get('/category/:category', getArticlesByCategory);
router.get('/location/:location', getArticlesByLocation);

// GET All
router.get('/', getAllArticles);

module.exports = router;
