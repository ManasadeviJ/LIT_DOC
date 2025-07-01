const mongoose = require('mongoose');

const sustainableFashionSchema = new mongoose.Schema({
  data: String,
  url: String,
  image: String
});

// ✅ Exporting as a model
module.exports = mongoose.model('SustainableFashion', sustainableFashionSchema);
