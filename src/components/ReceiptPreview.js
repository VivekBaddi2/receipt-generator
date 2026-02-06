'use client';

export default function ReceiptPreview({ receipt }) {
  if (!receipt) return null;

  return (
    <div className="receipt-preview-container p-4">
      <style jsx>{`
        .receipt-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          font-family: 'Times New Roman', Times, serif;
          background: white;
        }

        .receipt-header {
          text-align: center;
          padding: 12px 0;
          padding-bottom: 4px;
        }

        .receipt-title {
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .version-number {
          text-align: right;
          font-size: 10px;
          padding: 2px 12px;
        }

        .info-section {
          display: table;
          width: 100%;
          border-collapse: collapse;
        }

        .info-row {
          display: table-row;
        }

        .info-cell {
          display: table-cell;
          padding: 0px 12px;
          vertical-align: top;
          font-size: 12px;
        }

        .info-label {
          font-weight: bold;
          width: 15%;
        }

        .info-value {
          width: 40%;
        }

        .address-cell {
          width: 10%;
          border:none;
        }

        .data-table {
        margin-top: 12px;
          width: 100%;
          height: 150px;
          border-collapse: collapse;
        }

        .data-table th {
          padding: 4px 6px;
          font-weight: bold;
          text-align: center;
          font-size: 10px;
          border-top: 2px solid black;
          border-bottom: 2px solid black;
        }

        .data-table td {
          padding: 4px 6px;
          font-size: 11px;
          text-align: center;
          vertical-align: top;
        }

        .total-section {
          display: table;
          width: 100%;
        }

        .total-row {
          display: table-row;
        }

        .total-label {
          display: table-cell;
          padding: 4px 12px;
          border-top: 2px solid #000;
          width: 100%;
          font-size: 11px;
          font-weight: bold;
        }

        .total-value {
          display: table-cell;
          font-size: 11px;
          padding: 4px 12px;
          border-top: 2px solid #000;
          border-left: none;
          text-align: center;
          width: 20%;
        }

        .amount-words {
          padding: 0px 12px;
          font-size: 11px;
        }

        .terms-section {
          width: 60%;
          padding: 12px;
          font-size: 10px;
          line-height: 1.6;
        }

        .signature-section {
          width: 40%;
          padding: 12px;
          min-height: 50px;
          font-size: 12px;
        }

        @media print {
          .receipt-preview-container {
            padding: 0;
          }
        }
      `}</style>

      <div className="receipt-container font-bold overflow-auto">
        {/* Header */}
        <div className="receipt-header">
          <div className="receipt-title">RECEIPT</div>
        </div>

        {/* Version Number */}
        <div className="version-number">Rel 2.0.12</div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-row">
            <div className="info-cell info-label">Receipt No. :</div>
            <div className="info-cell info-value">{receipt.receiptNo}</div>
            <div className="info-cell info-label">Receipt Date :</div>
            <div className="info-cell info-value">{receipt.receiptDate}</div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label">Name :</div>
            <div className="info-cell info-value">{receipt.name}</div>
            <div className="info-cell info-label">Customer ID :</div>
            <div className="info-cell info-value">{receipt.customerId}</div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label">Address :</div>
            <div className="info-cell address-cell">{receipt.address}</div>
            <div className="info-cell info-label">Receipt Amount :</div>
            <div className="info-cell info-value">{receipt.amount.toFixed(2)}</div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label"></div>
            <div className="info-cell info-value"></div>
            <div className="info-cell info-label">Hypothecated To :</div>
            <div className="info-cell info-value">{receipt.hypothecatedTo}</div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label"></div>
            <div className="info-cell info-value"></div>
            <div className="info-cell info-label">Proprietor :</div>
            <div className="info-cell info-value">{receipt.proprietor}</div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label">Remark :</div>
            <div className="info-cell info-value">{receipt.remark}</div>
            <div className="info-cell info-label"></div>
            <div className="info-cell info-value"></div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label">Order/Inv No :</div>
            <div className="info-cell info-value">{receipt.orderType}</div>
            <div className="info-cell info-label"></div>
            <div className="info-cell info-value"></div>
          </div>

          <div className="info-row">
            <div className="info-cell info-label">Model :</div>
            <div className="info-cell info-value">{receipt.model}</div>
            <div className="info-cell info-label"></div>
            <div className="info-cell info-value"></div>
          </div>
        </div>

        {/* Table Section */}
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>Srl.</th>
              <th style={{ width: '12%' }}>Mode</th>
              <th style={{ width: '15%' }}>DD/CC/CHQ No.Date</th>
              <th style={{ width: '12%' }}>Favouring</th>
              <th style={{ width: '15%' }}>D1/Deposit Bank Name</th>
              <th style={{ width: '26%' }}></th>
              <th style={{ width: '15%' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{receipt.paymentMode}</td>
              <td>{receipt.chequeNo}</td>
              <td></td>
              <td>{receipt.depositBank ? 'DATE ' + receipt.depositDate : ''}</td>
              <td>{receipt.depositBank}</td>
              <td>{receipt.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="total-section">
          <div className="total-row">
            <div className="total-label">Total :</div>
            <div className="total-value">{receipt.amount.toFixed(2)}</div>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="amount-words">
          <strong>Amounts in words : {receipt.amountInWords}</strong>
        </div>

        <div className="flex justify-between">
          {/* Terms and Conditions */}
          <div className="terms-section">
            <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Terms and conditions</div>
            <div>
              <strong>1)</strong> This receipt issued subject to realisation of cheque / DD /Pay order / Cash <br />
              <strong> 2)</strong> Prices are subject to change without prior notice <br />
              <strong>3)</strong> Prices Ruling to same of dlivery will be Payment is received Original receipts is must be produced before taking delivery of vehicle <br />
              <strong>4)</strong> This Receipt is valid after clearance of cheques/ DD.
            </div>
          </div>

          {/* Signature Section */}
          <div className="signature-section flex flex-col gap-16 items-end font-bold">
            <div>For AUTOFIN LIMITED.</div>
            <div>(Authorized Signatory)</div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-md transition duration-200"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}
