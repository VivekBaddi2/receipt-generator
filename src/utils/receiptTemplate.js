export function generateReceiptHTML(receipt) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt - ${receipt.receiptNo}</title>
  <style>
    @page {
      size: A4;
      margin: 5mm;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      font-weight: bold;
      line-height: 1.3;
      color: #000;
      background: #fff;
    }

    .receipt-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          font-family: 'Times New Roman', Times, serif;
          background: white;
        }

     .receipt-header {
          text-align: center;
          padding-bottom: 4px;
          padding-top: 4px;
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
          width: 25%;
        }

        .address-cell {
          width: 10%;
          border:none;
        }

    .table-section {
      margin-top: 10px;
    }

    .data-table {
        margin-top: 12px;
          width: 100%;
          height: 150px;
          border-collapse: collapse;
        }

        .data-table th {
          padding: 9px 6px;
          padding-top: 2px;
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
          font-weight: 700;
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

        .footer{
          display: flex;
          justify-content: space-between;
        }

  .terms-section {
          width: 60%;
          padding: 12px;
          font-size: 10px;
          line-height: 1.6;
        }

    .terms-title {
      font-weight: bold;
      margin-bottom: 4px;
    }

     .signature-section {
          display: flex;
          flex-direction: column;
          gap: 64px;
          align-items: flex-end;
          font-weight: 700;
          width: 40%;
          padding: 12px;
          min-height: 50px;
          font-size: 12px;
        }

    .for-autofin {
      font-size: 10pt;
    }

    .authorized-signatory {
      font-size: 10pt;
      text-align: right;
    }

    .col-sr { width: 5%; }
    .col-mode { width: 12%; }
    .col-dd { width: 15%; }
    .col-favour { width: 12%; }
    .col-deposit { width: 15%; }
    .col-bank { width: 26%; }
    .col-amount { width: 15%; }

    @media print {
      body {
        margin: 0;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <!-- Header -->
    <div class="receipt-header">
      <div class="receipt-title">RECEIPT</div>
    </div>

    <!-- Version Number -->
    <div class="version-number">Rel 2.0.12</div>

    <!-- Info Section -->
    <div class="info-section">
      <div class="info-row">
        <div class="info-cell info-label">Receipt No.</div>
        <div class="info-cell info-value">: ${receipt.receiptNo}</div>
        <div class="info-cell info-label">Receipt Date</div>
        <div class="info-cell info-value">: ${receipt.receiptDate}</div>
      </div>
      
      <div class="info-row">
        <div class="info-cell info-label">Name</div>
        <div class="info-cell info-value">: ${receipt.name}</div>
        <div class="info-cell info-label">Customer ID</div>
        <div class="info-cell info-value">: ${receipt.customerId}</div>
      </div>
      
      <div class="info-row address-row">
        <div class="info-cell info-label">Address</div>
        <div class="info-cell address-cell">: ${receipt.address}</div>
        <div class="info-cell info-label">Receipt Amount</div>
        <div class="info-cell info-value">: ${receipt.amount.toFixed(2)}</div>
      </div>
      
      <div class="info-row">
        <div class="info-cell info-label"></div>
        <div class="info-cell info-value"></div>
        <div class="info-cell info-label">Hypothecated To</div>
        <div class="info-cell info-value">: ${receipt.hypothecatedTo}</div>
      </div>
      
      <div class="info-row">
        <div class="info-cell info-label"></div>
        <div class="info-cell info-value"></div>
        <div class="info-cell info-label">Proprietor</div>
        <div class="info-cell info-value">: ${receipt.proprietor}</div>
      </div>
      
      <div class="info-row">
        <div class="info-cell info-label">Remark</div>
        <div class="info-cell info-value">: ${receipt.remark}</div>
        <div class="info-cell info-label"></div>
        <div class="info-cell info-value"></div>
      </div>
      
      <div class="info-row">
        <div class="info-cell info-label">Order/Inv No</div>
        <div class="info-cell info-value">: ${receipt.orderType}</div>
        <div class="info-cell info-label"></div>
        <div class="info-cell info-value"></div>
      </div>
      
      <div class="info-row">
        <div class="info-cell info-label">Model</div>
        <div class="info-cell info-value">: ${receipt.model}</div>
        <div class="info-cell info-label"></div>
        <div class="info-cell info-value"></div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-section">
      <table class="data-table">
        <thead>
          <tr>
            <th class="col-sr">Sr1.</th>
            <th class="col-mode">Mode</th>
            <th class="col-dd">DD/CC/CHQ No.Date</th>
            <th class="col-favour">Favouring</th>
            <th class="col-deposit">D1/Deposit Bank Name</th>
            <th class="col-bank"></th>
            <th class="col-amount">Amount</th>
          </tr>
        </thead>
        <tbody>
         <tr>
              <td>1</td>
              <td>${receipt.paymentMode}</td>
              <td>${receipt.chequeNo} <br /> ${receipt.depositBank ? 'DATE ' + receipt.depositDate : ''} </td>
              <td></td>
              <td>${receipt.depositBank ? receipt.depositBank : ''}</td>
              <td></td>
              <td>${receipt.amount.toFixed(2)}</td>
            </tr>
        </tbody>
      </table>
      
      <div style="display: table; width: 100%;">
        <div class="total-row">
          <div class="total-label">Total :</div>
          <div class="total-value">${receipt.amount.toFixed(2)}</div>
        </div>
      </div>
    </div>

    <!-- Amount in Words -->
    <div class="amount-words">
      <strong>Amounts in words : ${receipt.amountInWords}</strong>
    </div>

    <div class="footer"> 
      <!-- Terms and Conditions -->
      <div class="terms-section">
        <div class="terms-title">Terms and conditions</div>
        <div>
          <strong>1) This receipt issued subject to realisation of cheque / DD /Pay order / Cash prior notice <br> </strong>
          <strong>2) Prices are subject to change without prior notice <br></strong>
          <strong>3) Prices Ruling to same of dlivery will be Payment is received Original receipts is must be produced before taking delivery of vehicle <br> </strong>
          <strong>4) This Receipt is valid after clearance of cheques/ DD. <br></strong>
        </div>
      </div>

      <!-- Signature Section -->
      <div class="signature-section">
        <div class="for-autofin">For AUTOFIN LIMITED.</div>
        <div class="authorized-signatory">(Authorized Signatory)</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
