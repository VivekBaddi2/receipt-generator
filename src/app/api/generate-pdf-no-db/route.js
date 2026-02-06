import { NextResponse } from 'next/server';
import { generatePDF } from '../../../lib/pdf';
import { generateReceiptHTML } from '../../../utils/receiptTemplate';

// This version skips database and just generates PDF
export async function POST(request) {
  try {
    const receiptData = await request.json();

    console.log('Generating PDF for receipt:', receiptData.receiptNo);

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
