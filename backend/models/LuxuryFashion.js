const mongoose = require('mongoose');

const luxuryFashionSchema = new mongoose.Schema({
  caption: String,
  data: String,
  url: String,
  image: String
});

// ✅ Exporting as a model
module.exports = mongoose.model('LuxuryFashion', luxuryFashionSchema);
