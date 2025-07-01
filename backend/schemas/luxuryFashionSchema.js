const mongoose = require('mongoose');

const luxuryFashionSchema = new mongoose.Schema({
  caption: String,
  data: String,
  url: String,
  image: String
}, { _id: false });

module.exports = luxuryFashionSchema;
