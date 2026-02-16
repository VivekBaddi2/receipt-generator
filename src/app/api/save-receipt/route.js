import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Receipt from '../../../models/Receipt';

export async function POST(request) {
    const receiptData = await request.json();
    console.log(receiptData)
    // Connect to database
    await connectDB();
    const receiptExists = await Receipt.findOne({ receiptNo: receiptData.receiptNo });

    // Save receipt to database
    if (!receiptExists) {
        const receipt = new Receipt(receiptData);
        console.log(receipt)
        await receipt.save();
        return new NextResponse(JSON.stringify({ message: 'Receipt saved successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new NextResponse(JSON.stringify({ message: 'Receipt already exists' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });


}
