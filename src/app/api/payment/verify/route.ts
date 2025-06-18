import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Order from '@/models/Order';
import { sendPaymentConfirmation, sendPaymentFailure } from '@/utils/emailService';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      shippingAddress,
    } = body;

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    const isAuthentic = signature === razorpay_signature;

    if (isAuthentic) {
      // Connect to database
      await connectToDatabase();

      // Create order record
      const order = new Order({
        orderId: `ORD${Date.now()}`,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: body.amount,
        currency: body.currency || 'INR',
        status: 'completed',
        customer,
        items,
        shippingAddress,
      });

      await order.save();

      // Send confirmation email
      try {
        await sendPaymentConfirmation(customer.email, {
          orderId: order.orderId,
          amount: order.amount,
          items: order.items,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the request if email fails
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        orderId: order.orderId,
      });
    } else {
      // Send failure email if customer details are available
      if (customer?.email) {
        try {
          await sendPaymentFailure(
            customer.email,
            razorpay_order_id,
            'Invalid payment signature'
          );
        } catch (emailError) {
          console.error('Failed to send failure email:', emailError);
        }
      }

      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    
    // Send failure email if customer details are available
    if (body?.customer?.email) {
      try {
        await sendPaymentFailure(
          body.customer.email,
          body.razorpay_order_id,
          'Payment verification failed'
        );
      } catch (emailError) {
        console.error('Failed to send failure email:', emailError);
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
} 