const mongoose = require('mongoose');

const fastFashionSchema = new mongoose.Schema({
  caption: String,
  data: String,
  url: String,
  image: String
}); // 👈 REMOVE _id: false here

module.exports = mongoose.model('FastFashion', fastFashionSchema);
