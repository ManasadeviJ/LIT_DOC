const mongoose = require('mongoose');

const sustainableFashionSchema = new mongoose.Schema({
  data: String,
  url: String,
  image: String
}, { _id: false });

module.exports = sustainableFashionSchema;
