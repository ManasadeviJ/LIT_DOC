import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // In a real application, you would get the user ID from the session
    // and filter orders by user ID. For now, we'll return all orders.
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 