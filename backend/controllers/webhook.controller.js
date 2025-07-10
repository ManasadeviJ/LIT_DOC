// File: backend/controllers/webhook.controller.js

const phonepeClient = require('../services/phonepe.service');
const Order = require('../models/order.model.js');

const handlePhonePeWebhook = async (req, res) => {
  // ========================= THE FIX IS HERE =========================
  // First, check if the PhonePe client is in dummy mode.
  if (phonepeClient.isDummy) {
    // This prevents any processing if the service isn't configured.
    return res.status(503).send('Service Unavailable: PhonePe webhooks are not configured.');
  }
  // ===================================================================

  const { PHONEPE_WEBHOOK_USERNAME, PHONEPE_WEBHOOK_PASSWORD } = process.env;

  try {
    const authorizationHeader = req.headers['authorization'];
    const requestBodyString = req.rawBody; 
    
    const callbackResponse = phonepeClient.validateCallback(
      PHONEPE_WEBHOOK_USERNAME,
      PHONEPE_WEBHOOK_PASSWORD,
      authorizationHeader,
      requestBodyString
    );

    const { payload } = callbackResponse;
    const { merchantOrderId, state, transactionId } = payload;

    console.log(`✅ PhonePe Webhook received for order ${merchantOrderId}. State: ${state}`);

    const updatedOrder = await Order.findOneAndUpdate(
      { merchantOrderId: merchantOrderId, 'paymentDetails.status': 'PENDING' },
      { 
        $set: { 
          'paymentDetails.status': state.toUpperCase(),
          'paymentDetails.paymentId': transactionId, 
          'paymentDetails.webhookPayload': payload,
        } 
      },
      { new: true }
    );

    if (!updatedOrder) {
      console.warn(`Webhook Warning: Order ${merchantOrderId} not found or was already processed.`);
      return res.status(200).send('Order not found or already processed.');
    }

    console.log(`Order ${merchantOrderId} status successfully updated to ${updatedOrder.paymentDetails.status}`);
    
    res.status(200).send('Webhook processed successfully.');

  } catch (error) {
    console.error("❌ PhonePe Webhook validation failed:", error.message);
    res.status(401).send('Invalid webhook signature.');
  }
};

// You can add the handler for Razorpay webhooks here later
const handleRazorpayWebhook = async (req, res) => {
  // ...
};

module.exports = {
  handlePhonePeWebhook,
  handleRazorpayWebhook,
};

// const Order = require('../models/order.model.js'); // <-- Import the Order model

// const getOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     if (!orderId) {
//       return res.status(400).json({ success: false, message: "Order ID is required." });
//     }

//     // Find the order in YOUR database by its merchantOrderId
//     const order = await Order.findOne({ merchantOrderId: orderId });

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found." });
//     }

//     // Securely return only the status of the payment, not the whole order object.
//     res.status(200).json({
//       success: true,
//       status: order.paymentDetails.status // e.g., 'COMPLETED', 'FAILED', 'PENDING'
//     });

//   } catch (error) {
//     console.error("Get Order Status Error:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   getOrderStatus,
// };