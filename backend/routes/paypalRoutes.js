// lit-landing-backend/routes/paypalRoutes.js


const express = require('express');
const axios = require('axios');
const Order = require('../models/order.model.js');
const router = express.Router();

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

/**
 * Generate an OAuth 2.0 access token to authenticate API calls.
 */
const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
        const response = await axios({
            url: `${base}/v1/oauth2/token`,
            method: 'POST',
            data: 'grant_type=client_credentials',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error.response ? error.response.data : error.message);
        throw new Error("Failed to generate Access Token");
    }
};

/**
 * Create a PayPal order with a given amount.
 */
const createOrder = async (orderData) => {
    // In a real app, you would get the totalPrice from your cart context or redux store,
    // and validate it on the backend to ensure the price is correct.
    const { totalPrice } = orderData; 
    
    if (!totalPrice || isNaN(totalPrice)) {
        throw new Error("Invalid total price for PayPal order.");
    }

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: "USD", // IMPORTANT: Change to "INR" if your primary currency is Rupees
                value: totalPrice.toFixed(2), // Ensure value is a string with 2 decimal places
            },
        }],
    };

    const response = await axios({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        data: payload,
    });
    
    return response.data;
};

/**
 * Capture payment for the created order to complete the transaction.
 */
const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await axios({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return response.data;
};

// --- ROUTE DEFINITIONS ---

// @desc    Create a new PayPal order
// @route   POST /api/paypal/orders
// @access  Private (should be protected by your auth middleware)
router.post("/orders", async (req, res) => {
    try {
        // The frontend will send the cart/order data in the request body
        const orderData = req.body;
        const response = await createOrder(orderData);
        res.status(200).json(response);
    } catch (error) {
        console.error("PayPal Create Order Error:", error);
        res.status(500).json({ message: "Failed to create PayPal order." });
    }
});

// @desc    Capture the payment for a PayPal order
// @route   POST /api/paypal/orders/:orderID/capture
// @access  Private
router.post("/orders/:orderID/capture", async (req, res) => {
    try {
        const { orderID } = req.params;
        const response = await captureOrder(orderID);
        // This is the point of successful payment.
        // The frontend will now use this successful response to create an order in your own database.
        console.log("✅ PayPal Payment captured successfully!", response);
        res.status(200).json(response);
    } catch (error) {
        console.error("PayPal Capture Order Error:", error);
        res.status(500).json({ message: "Failed to capture PayPal order." });
    }
});

router.post('/refunds/:captureId', async (req, res) => {
    try {
        const { captureId } = req.params;
        const { amount, reason } = req.body; // Optionally allow partial refunds and a reason

        const accessToken = await generateAccessToken();
        const url = `${base}/v2/payments/captures/${captureId}/refund`;

        const payload = {};
        if (amount) {
            payload.amount = {
                value: amount,
                currency_code: 'USD' // Or INR, must match original transaction
            };
        }
        
        const response = await axios({
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            data: payload
        });

        // Here you would update your order status in MongoDB to "Refunded"
        console.log('✅ Refund processed successfully:', response.data);

        res.status(201).json(response.data);

    } catch (error) {
        console.error("PayPal Refund Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to process refund.' });
    }
});

module.exports = router;
