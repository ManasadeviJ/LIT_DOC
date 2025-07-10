// File: backend/controllers/phonepe.controller.js

const { randomUUID } = require('crypto');
const { StandardCheckoutPayRequest } = require('pg-sdk-node');
const phonepeClient = require('../services/phonepe.service');
const Order = require('../models/order.model.js');

const initiatePhonePePayment = async (req, res) => {
  // ========================= THE FIX IS HERE =========================
  // First, check if the PhonePe client is in dummy mode.
  if (phonepeClient.isDummy) {
    // If the keys are not set, we immediately return a "Service Unavailable" error.
    // This prevents the server from crashing and gives a clear message to the frontend.
    return res.status(503).json({ 
      success: false, 
      message: "Service Unavailable: PhonePe payment gateway is not configured on the server." 
    });
  }
  // ===================================================================

  // The rest of the code will only run if the PhonePe client is real.
  const { amount, products, shippingAddress } = req.body;
  
  if (!amount || !products || !shippingAddress || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid order data provided." });
  }

  const merchantOrderId = `LUXURY-TXN-${randomUUID()}`;

  try {
    await Order.create({
      merchantOrderId: merchantOrderId,
      products: products,
      totalAmount: amount,
      shippingAddress: shippingAddress,
      paymentDetails: { gateway: 'PHONEPE' }
    });
    console.log(`Order ${merchantOrderId} created in DB with status PENDING.`);

    const paymentAmountInPaise = Math.round(amount * 100);
    const redirectUrl = `${process.env.FRONTEND_URL}/payment-status?orderId=${merchantOrderId}`;

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(paymentAmountInPaise)
      .redirectUrl(redirectUrl)
      .build();

    const response = await phonepeClient.pay(request);
    
    return res.status(200).json({
      success: true,
      redirectUrl: response.redirectUrl
    });

  } catch (error) {
    console.error("Error during PhonePe payment initiation:", error);
    return res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
};

module.exports = {
  initiatePhonePePayment,
};
// const { randomUUID } = require('crypto');
// const { StandardCheckoutPayRequest } = require('pg-sdk-node');
// const phonepeClient = require('../services/phonepe.service.js');
// const Order = require('../models/order.model.js'); // <-- Import the Order model

// const initiatePhonePePayment = async (req, res) => {
//   if (!phonepeClient) {
//     return res.status(500).json({ success: false, message: "PhonePe client is not initialized." });
//   }

//   // Frontend should send the cart total, products, and shipping info.
//   // In a real app, you MUST validate the amount on the backend to prevent tampering.
//   const { amount, products, shippingAddress } = req.body;
//   // const userId = req.user.id; // Assuming you have auth middleware that adds user to req

//   // 1. Basic Validation
//   if (!amount || !products || !shippingAddress || !Array.isArray(products) || products.length === 0) {
//     return res.status(400).json({ success: false, message: "Invalid order data provided." });
//   }

//   // 2. Generate a Unique Order ID from our system
//   const merchantOrderId = `LUXURY-TXN-${randomUUID()}`;

//   try {
//     // 3. CREATE the order in your database with 'PENDING' status
//     // This is the most important step before calling the gateway.
//     await Order.create({
//       merchantOrderId: merchantOrderId,
//       // userId: userId, // Associate the order with the logged-in user
//       products: products, // This should be the "snapshot" array of products
//       totalAmount: amount,
//       shippingAddress: shippingAddress,
//       paymentDetails: {
//         gateway: 'PHONEPE',
//         // The status defaults to 'PENDING' as per our schema
//       }
//     });
//     console.log(`Order ${merchantOrderId} created in DB with status PENDING.`);

//     // 4. Create the PhonePe Payment Request
//     const paymentAmountInPaise = Math.round(amount * 100);
//     const redirectUrl = `${process.env.FRONTEND_URL}/payment-status?orderId=${merchantOrderId}`;

//     const request = StandardCheckoutPayRequest.builder()
//       .merchantOrderId(merchantOrderId)
//       .amount(paymentAmountInPaise)
//       .redirectUrl(redirectUrl)
//       .build();

//     // 5. Call the PhonePe API to get the redirect URL
//     const response = await phonepeClient.pay(request);
    
//     // 6. Send the redirect URL back to the frontend
//     return res.status(200).json({
//       success: true,
//       redirectUrl: response.redirectUrl
//     });

//   } catch (error) {
//     console.error("Error during payment initiation:", error);
//     // This will catch both database errors and PhonePe API errors
//     return res.status(500).json({ success: false, message: "An internal server error occurred." });
//   }
// };

// module.exports = {
//   initiatePhonePePayment,
// };