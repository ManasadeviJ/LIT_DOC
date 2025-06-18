const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please use a valid email address'],
  },
}, {
  timestamps: true,
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber; 