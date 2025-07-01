// backend/controllers/articleController.js
const Article = require('../models/Articles');

// GET all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishDate: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error fetching articles' });
  }
};

// GET article by ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error finding article by ID' });
  }
};

// GET article by slug
const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error finding article by slug' });
  }
};

// GET articles by category
const getArticlesByCategory = async (req, res) => {
  try {
    const regex = new RegExp(`^${req.params.category}$`, 'i');
    const articles = await Article.find({ category: regex }).sort({ publishDate: -1 });
    if (!articles.length) {
      return res.status(404).json({ message: 'No articles found in this category' });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error fetching by category' });
  }
};

// GET articles by location
const getArticlesByLocation = async (req, res) => {
  try {
    const regex = new RegExp(`^${req.params.location}$`, 'i');
    const articles = await Article.find({ location: regex }).sort({ publishDate: -1 });
    if (!articles.length) {
      return res.status(404).json({ message: 'No articles found for this location' });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error fetching by location' });
  }
};

// GET articles by category & location
const getArticlesByCategoryAndLocation = async (req, res) => {
  try {
    const categoryRegex = new RegExp(`^${req.params.category}$`, 'i');
    const locationRegex = new RegExp(`^${req.params.location}$`, 'i');
    const articles = await Article.find({ category: categoryRegex, location: locationRegex }).sort({ publishDate: -1 });

    if (!articles.length) {
      return res.status(404).json({ message: 'No articles found matching both category and location' });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error fetching category and location' });
  }
};

// CREATE article
const createArticle = async (req, res) => {
  try {
    const existing = await Article.findOne({ slug: req.body.slug });
    if (existing) {
      return res.status(409).json({ message: 'Slug already exists. Use a unique slug.' });
    }

    const article = new Article({
      ...req.body,
      publishDate: req.body.publishDate || new Date().toISOString().split('T')[0]
    });

    await article.save();
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error creating article' });
  }
};

// UPDATE article by slug
const updateArticleBySlug = async (req, res) => {
  try {
    const updated = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Article not found to update' });
    }
    res.json({ message: 'Article updated successfully', article: updated });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error updating article' });
  }
};

// ✅ DELETE article by slug
const deleteArticleBySlug = async (req, res) => {
  try {
    const deleted = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) {
      return res.status(404).json({ message: 'Article not found to delete' });
    }
    res.json({ message: 'Article deleted successfully', article: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error deleting article' });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByLocation,
  getArticlesByCategoryAndLocation,
  createArticle,
  updateArticleBySlug,
  deleteArticleBySlug
};
