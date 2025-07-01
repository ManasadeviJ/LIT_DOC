const mongoose = require('mongoose');

// Import sub-schemas correctly
const fastFashionSchema = require('../schemas/fastfashionSchema');
const luxuryFashionSchema = require('../schemas/luxuryFashionSchema');
const sustainableFashionSchema = require('../schemas/sustainableFashionSchema');
const sneakerWorldSchema = require('../schemas/sneakerWorldSchema');

const mailArticleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  fashion_fact: String,
  fast_fashion: fastFashionSchema,
  luxury_fashion: luxuryFashionSchema,
  sustainable_fashion: sustainableFashionSchema,
  sneaker_world: sneakerWorldSchema
});

module.exports = mongoose.model('MailArticle', mailArticleSchema);
