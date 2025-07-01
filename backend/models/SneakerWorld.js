const mongoose = require('mongoose');

const sneakerWorldSchema = new mongoose.Schema({
  caption: String,
  url: String,
  image: String
});

// ✅ Exporting as a model
module.exports = mongoose.model('SneakerWorld', sneakerWorldSchema);
