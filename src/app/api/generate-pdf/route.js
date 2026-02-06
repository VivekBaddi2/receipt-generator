import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Receipt from '../../../models/Receipt';
import { generatePDF } from '../../../lib/pdf';
import { generateReceiptHTML } from '../../../utils/receiptTemplate';

export async function POST(request) {
  try {
    const receiptData = await request.json();

    // Connect to database
    await connectDB();
    const receiptExists = await Receipt.findOne({ _id: receiptData._id });

    // Save receipt to database
    if (!receiptExists) {
      const receipt = new Receipt(receiptData);
      await receipt.save();
    }

    // Generate HTML
    const html = generateReceiptHTML(receiptData);

    // Generate PDF
    const pdfBuffer = await generatePDF(html);

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="receipt-${receiptData.receiptNo}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}
