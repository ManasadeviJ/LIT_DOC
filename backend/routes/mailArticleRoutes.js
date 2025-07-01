const express = require('express');
const router = express.Router();
const mailArticleController = require('../controllers/mailArticleController');

// Create
router.post('/', mailArticleController.createArticle);

// Read All
router.get('/', mailArticleController.getAllArticles);

// Read One by ID
router.get('/:id', mailArticleController.getArticleById);

// Update
router.put('/:id', mailArticleController.updateArticle);

// Delete
router.delete('/:id', mailArticleController.deleteArticle);

module.exports = router;
