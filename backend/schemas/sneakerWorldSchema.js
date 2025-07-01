const mongoose = require('mongoose');

const sneakerWorldSchema = new mongoose.Schema({
  caption: String,
  url: String,
  image: String
}, { _id: false });

module.exports = sneakerWorldSchema;
