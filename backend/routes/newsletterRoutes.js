const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter/subscribers
// @access  Public
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Subscribe a new email to the newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please enter an email address' });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(409).json({ message: 'This email is already subscribed' });
    }

    const newSubscriber = await Subscriber.create({ email });

    res.status(201).json({ message: 'Successfully subscribed', subscriber: newSubscriber });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router; 