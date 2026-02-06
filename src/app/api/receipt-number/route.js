export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Receipt from '../../../models/Receipt';

export async function GET() {
    try {
        await connectDB();

        const lastReceipt = await Receipt.findOne({})
            .sort({ createdAt: -1 })
            .select('receiptNo');

        return NextResponse.json({ lastReceipt });
    } catch (error) {
        console.error('Error fetching receipts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch receipt' },
            { status: 500 }
        );
    }
}
