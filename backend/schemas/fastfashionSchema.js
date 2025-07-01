const mongoose = require('mongoose');

const fastFashionSchema = new mongoose.Schema({
  caption: String,
  data: String,
  url: String,
  image: String
}, { _id: false });

module.exports = fastFashionSchema;
