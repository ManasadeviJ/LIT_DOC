// File: backend/controllers/order.controller.js

// This is a placeholder for your database model.
// Replace this with your actual Order model.
// const Order = require('../models/order.model.js');

const getOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        //
        // ================== YOUR DATABASE LOGIC HERE ==================
        // This is where you query YOUR database for the order status.
        // The webhook is responsible for UPDATING the status.
        // This endpoint is only for READING it.
        //
        // const order = await Order.findOne({ merchantOrderId: orderId });
        //
        // ===============================================================

        // For demonstration, we'll mock the database response.
        // In a real scenario, the webhook would have updated this to 'COMPLETED'.
        const order = { status: 'COMPLETED' }; 

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        // Return the status from YOUR database.
        res.status(200).json({ success: true, status: order.status });

    } catch (error) {
        console.error("Get Order Status Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getOrderStatus,
};