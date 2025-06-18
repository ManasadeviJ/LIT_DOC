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
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    try {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id, // Map _id from frontend to product reference
          _id: undefined, // Remove original _id from orderItems to avoid Mongoose conflict
        })),
        user: req.user._id, // Get user from auth middleware
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
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