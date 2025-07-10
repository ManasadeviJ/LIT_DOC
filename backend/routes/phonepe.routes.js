// backend/routes/phonepe.routes.js
const express = require('express');
const router = express.Router();
const { initiatePhonePePayment } = require('../controllers/phonepe.controller');
const Order = require('../models/order.model.js');

// @route   POST /api/phonepe/initiate
router.post('/initiate', initiatePhonePePayment);

module.exports = router;