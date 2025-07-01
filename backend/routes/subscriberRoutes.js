const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

// Create (subscribe)
router.post('/subscribe', subscriberController.createSubscriber);

// Read All subscribers
router.get('/', subscriberController.getAllSubscribers);

// Delete by ID
router.delete('/:id', subscriberController.deleteSubscriber);

module.exports = router;
