'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaCreditCard, FaPaypal, FaApplePay } from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    // Fetch order details from your backend
    // This is a placeholder - replace with actual API call
    setOrderDetails({
      subtotal: 1000,
      shipping: 100,
      tax: 180,
      total: 1280
    });
  }, []);

  const initializePayment = async () => {
    try {
      setLoading(true);
      
      // Create order on your backend
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderDetails.total,
          currency: 'INR',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error('Failed to initialize payment');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Luxury In Taste',
        description: 'Payment for your order',
        order_id: data.orderId,
        handler: function (response: any) {
          // Handle successful payment
          verifyPayment(response);
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#2563EB',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (response: any) => {
    try {
      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const data = await verifyResponse.json();

      if (data.success) {
        // Payment successful
        router.push('/payment/success');
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <FaLock className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Secure Payment</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-semibold mb-6">Payment</h1>
              
              {/* Payment Methods */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`p-4 border rounded-lg flex items-center justify-center ${
                      selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <FaCreditCard className="mr-2" />
                    <span>Credit/Debit Card</span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('paypal')}
                    className={`p-4 border rounded-lg flex items-center justify-center ${
                      selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <FaPaypal className="mr-2" />
                    <span>PayPal</span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('apple')}
                    className={`p-4 border rounded-lg flex items-center justify-center ${
                      selectedPayment === 'apple' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <FaApplePay className="mr-2" />
                    <span>Apple Pay</span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('google')}
                    className={`p-4 border rounded-lg flex items-center justify-center ${
                      selectedPayment === 'google' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <SiGooglepay className="mr-2" />
                    <span>Google Pay</span>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>₹{orderDetails.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={initializePayment}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage; 