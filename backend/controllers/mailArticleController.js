const MailArticle = require('../models/MailArticles');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const newArticle = new MailArticle(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await MailArticle.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await MailArticle.findOne({ id: req.params.id });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update article by ID
exports.updateArticle = async (req, res) => {
  try {
    const updated = await MailArticle.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await MailArticle.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
