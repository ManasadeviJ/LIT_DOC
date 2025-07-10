const mongoose = require('mongoose');

// This sub-schema defines the structure of each product within an order.
// It creates a "snapshot" of the product details at the time of purchase.
const orderedProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // A reference to the original product in your 'products' collection.
    required: true,
  },
  name: {
    type: String,
    required: true, // The product name at the time of purchase.
  },
  price: {
    type: Number,
    required: true, // The price at the time of purchase.
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  // Optional: You might want to store the specific color/size chosen
  color: { type: String },
  size: { type: String },
}, { _id: false });


// This sub-schema stores the shipping details for the order.
const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
}, { _id: false });


// This sub-schema tracks the payment-specific information.
const paymentDetailsSchema = new mongoose.Schema({
  gateway: {
    type: String,
    required: true,
    enum: ['PHONEPE', 'RAZORPAY', 'PAYPAL'], // Ensures only valid gateways are stored.
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], // The lifecycle of the payment.
    default: 'PENDING', // Every new order starts as PENDING.
  },
  // The transaction ID from the payment gateway (e.g., PhonePe's transactionId)
  paymentId: { type: String }, 
  
  // Optional: Store the final webhook response from the gateway for debugging.
  // The 'Mixed' type can hold any JSON object.
  webhookPayload: { type: mongoose.Schema.Types.Mixed },
}, { _id: false });


// --- Main Order Schema ---
const orderSchema = new mongoose.Schema({
  // The unique ID we generate and send to the payment gateway.
  // This is how we find and update the order when a webhook arrives.
  merchantOrderId: {
    type: String,
    required: true,
    unique: true, // Ensures no two orders can have the same transaction ID.
    index: true,  // Improves lookup performance.
  },

  // The customer who placed the order.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // A reference to your 'User' collection.
    required: true,
  },

  // An array of the products included in this order.
  products: {
    type: [orderedProductSchema],
    required: true,
  },

  // The final calculated amount for the entire order.
  totalAmount: {
    type: Number,
    required: true,
  },

  // The shipping address for this specific order.
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
  
  // The payment status and details for this order.
  // This is the MOST IMPORTANT part for our payment flow.
  paymentDetails: {
    type: paymentDetailsSchema,
    required: true,
  },

}, {
  // This option automatically adds `createdAt` and `updatedAt` fields.
  timestamps: true,
});


const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;
