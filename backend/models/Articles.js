const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  publishDate: String, 
  category: String,
  location: String,
  bodyContent: String
});

module.exports = mongoose.model('Article', articleSchema)