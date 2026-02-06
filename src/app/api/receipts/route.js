export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Receipt from '../../../models/Receipt';

export async function GET() {
  try {
    await connectDB();

    const receipts = await Receipt.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ receipts });
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipts' },
      { status: 500 }
    );
  }
}
