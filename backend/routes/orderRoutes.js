const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product'); // Needed to check product stock
const User = require('../models/User'); // Needed for user reference

// Middleware to protect routes (you might need to implement actual auth middleware later)
const protect = (req, res, next) => {
  // For now, a placeholder. You'll implement actual JWT verification here.
  // This would typically involve decoding a JWT token from the Authorization header
  // and verifying the user.
  console.log('Authentication middleware placeholder');
  // Assuming a user is authenticated for now for testing purposes
  req.user = { _id: 'someUserId' }; // Placeholder user ID
  next();
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    // This route is called BEFORE the user pays.
    const {
        products,
        shippingAddress,
        totalAmount,
        paymentGateway, // e.g., 'PAYPAL'
    } = req.body;

    if (!products || products.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        // Generate a unique ID for this order. This is what you'll track.
        const merchantOrderId = `MTO-${Date.now()}-${uuid.v4().slice(0, 6)}`;

        const order = new Order({
            merchantOrderId,
            userId: req.user._id,
            products,
            shippingAddress,
            totalAmount,
            paymentDetails: {
                gateway: paymentGateway.toUpperCase(), // Store as PAYPAL
                status: 'PENDING', // The order starts as PENDING
            },
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder); // Send the PENDING order back to the frontend

    } catch (error) {
        console.error("Create Pending Order Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update order to PAID after successful payment
// @route   PUT /api/orders/:merchantOrderId/pay
// @access  Private
router.put('/:merchantOrderId/pay', protect, async (req, res) => {
    // This route is called AFTER the user pays.
    const { merchantOrderId } = req.params;
    const { paymentId, status, webhookPayload } = req.body; // Details from PayPal

    const order = await Order.findOne({ merchantOrderId });

    if (order) {
        order.paymentDetails.status = 'COMPLETED';
        order.paymentDetails.paymentId = paymentId;
        order.paymentDetails.webhookPayload = webhookPayload; // Store the full PayPal response

        const updatedOrder = await order.save();
        
        // At this point, you should also decrement product stock
        // and send a confirmation email.

        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'username email');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email');

    if (order) {
      // Ensure the order belongs to the authenticated user or if the user is an admin
      if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 