export function generateReceiptHTML(receipt) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt - ${receipt.receiptNo}</title>
  <style>
    @page{
      size: A4;
      margin: 5mm;
    }
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .container {
            padding: 4px;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            font-family: 'Times New Roman', Times, serif;
            background: white;
        }

        .heading {
            text-align: center;
        }

        .heading h1 {
            font-size: 28px;
        }

        .releaseVersion {
            width: 100%;
            font-size: 8px;
            font-weight: bold;
            margin-bottom: 20px;
            display: flex;
            justify-content: right;
        }

        .receiptDataContainer {
            display: flex;
            gap: 24px;
            font-weight: bold;
            font-size: 10px;
            width: 100%;
            margin: auto auto;
            margin-bottom: 8px;
        }

        .leftDiv {
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .rightDiv {
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .row {
            display: flex;
            width: full;
        }

        .row .rowLabel {
            width: 30%;
        }

        .row .rowValue {
            display: flex;
            gap: 16px;
        }

        .colon {
            width: 10%;
        }

        #address {
            min-height: 50px;
        }

        #address .rowValue{
          width: 60%;
          text-wrap: wrap;
        }
        .table {
            width: 100%;
            font-size: 10px;
            font-weight: bold;
            margin: auto auto;
            margin-top: 2px;
            page-break-inside: avoid;
        }

        .data-table {
            border-collapse: collapse;
            height: 120px;
            width: 100%;
            table-layout: fixed; 
        }

        thead tr th {
            border: 2px solid black;
            border-right: 0px;
            border-left: 0px;
            box-sizing: border-box; 
            padding-bottom: 8px;
        }

        tbody tr td {
            padding-top: 2px;
            text-align: center;
            vertical-align: top;
            box-sizing: border-box; 
        }

        .total-section {
            display: table;
            width: 100%;
            margin: auto auto;
            font-weight: bold;
        }

        .total-row {
            display: table-row;
        }

        .total-label {
            display: table-cell;
            padding: 4px 12px;
            padding-left: 0px;
            border-top: 2px solid #000;
            width: 100%;
            font-size: 10px;
            font-weight: bold;
        }

        .total-value {
            display: table-cell;
            font-size: 10px;
            padding: 4px 12px;
            border-top: 2px solid #000;
            border-left: none;
            text-align: center;
            width: 20%;
        }

        .amount-words {
            width: 100%;
            margin: auto auto;
            padding: 0px 12px;
            padding-left: 0px;
            font-size: 11px;
        }
        .terms-signature-container{
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 10px;
            width: 100%;
            margin: auto auto;
            margin-bottom: 20px
        }
        .amount-words {
          padding: 0px 12px;
          font-size: 10px;
        }

        .terms-section {
          width: 60%;
          padding: 0px 12px;
          padding-left: 0px;
          font-size: 10px;
          line-height: 1.6;
        }

        .signature-section {
          width: 40%;
          padding: 0px 12px;
          min-height: 50px;
          font-size: 10px;
        }

        @media print {
          .container {
            padding: 0px 28px;
            margin: 0px;
          }
      }
  </style>
</head>
<body>
 <div class="container" style="background: white; font-weight: bold; overflow: auto; padding: 0px">
    <div class="heading">
        <h1>RECEIPT</h1>
    </div>
    <div class="releaseVersion">
        Rel 2.0.12
    </div>
    <div class="receiptDataContainer">
        <div class="leftDiv">
            <div class="row">
                <div class="rowLabel">Receipt No</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.receiptNo}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Name</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.name.toUpperCase()}</div>
                </div>
            </div>
            <div id="address" class="row">
                <div class="rowLabel">Address</div>
                <div class="rowValue">
                    <div>:</div>
                    <div style="width: 100%;">${receipt.address.toUpperCase()}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Remark</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.remark}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Order/Inv No</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.orderType}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Model</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.model === "Other" ? receipt.modelOther : receipt.model}</div>
                </div>
            </div>
        </div>
        <div class="rightDiv">
            <div class="row">
                <div class="rowLabel">Receipt Date</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.receiptDate}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Customer ID</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.customerId}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Receipt Amount</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.amount.toFixed(2)}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Hypothecated To</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.hypothecatedTo}</div>
                </div>
            </div>
            <div class="row">
                <div class="rowLabel">Proprietor</div>
                <div class="rowValue">
                    <div>:</div>
                    <div>${receipt.proprietor.toUpperCase()}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="table">
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 5%;">Srl.</th>
                    <th style="width: 12%;">Mode</th>
                    <th style="width: 15%;">DD/CC/CHQ No./UTR</th>
                    <th style="width: 12%;">Favouring</th>
                    <th style="width: 15%;">Deposit Date</th>
                    <th style="width: 26%;"></th>
                    <th style="width: 15%;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>${receipt.paymentMode}</td>
                    <td>${receipt.chequeNo}</td>
                    <td></td>
                    <td>${receipt.depositDate}</td>
                    <td></td>
                    <td>${receipt.amount.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="total-section">
        <div class="total-row">
            <div class="total-label">Total :</div>
            <div class="total-value">${receipt.amount.toFixed(2)}</div>
        </div>
    </div>
    <div class="amount-words" style="padding-left:0px">
        <strong>Amounts in words : ${receipt.amountInWords}</strong>
    </div>
    <div class="terms-signature-container">
        <div class="terms-section">
            <div style="font-weight: bold;">Terms and conditions</div>
            <div>
                <strong>1)</strong> This receipt issued subject to realisation of cheque / DD /Pay order / Cash
                <br />
                <strong> 2)</strong> Prices are subject to change without prior notice <br />
                <strong>3)</strong> Prices Ruling to same of dlivery will be Payment is received Original receipts
                is must be produced before taking delivery of vehicle <br />
                <strong>4)</strong> This Receipt is valid after clearance of cheques/ DD.
            </div>
        </div>
        <div class="signature-section relative flex flex-col gap-16 items-end font-bold">
            <div>For ${receipt.for}</div>
            <div>(Authorized Signatory)</div>
            <div style="position: absolute; left: 65%; translate-y: -50%">
                ${receipt.seal === "yes" && receipt.for === "OM SAI MOTORS PVT. LTD." ? `<img src="/Om sai motors.png" alt="Om sai motors seal" height="130px" width="130px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "SEHGAL AUTORIDERS PVT. LTD." ? `<img src="/Sehgal Autoriders Pvt Ltd.png" alt="Sehgal autoriders seal" height="180px" width="180px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "AUTOFIN LIMITED" ? `<img src="/Autofin Ltd.png" alt="Autofin Ltd Seal" height="110px" width="110px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "SUMANKIRTI CARS PVT. LTD." ? `<img src="/Sumankirti.png" alt="Sumankirti Cars Pvt Ltd Seal" height="110px" width="110px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "Varun Motors Pvt. Ltd." ? `<img src="/Varun Motors pvt ltd.png" alt="Varun Motors Pvt Ltd Seal" height="110px" width="110px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "Sai Point Cars Pvt. Ltd." ? `<img src="/Sai Point Cars pvt ltd.png" alt="Sai Point Cars Pvt Ltd Seal" height="110px" width="110px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "Kothari Auto Wheels Pvt. Ltd." ? `<img src="/Kothari Auto Wheels pvt ltd.png" alt="Kothari Auto Wheels Pvt Ltd Seal" height="110px" width="110px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "MSA Motors" ? `<img src="/MSA motors.png" alt="MSA Motors Seal" height="110px" width="110px" />` : ''}
                ${receipt.seal === "yes" && receipt.for === "Adarsha Automotives Pvt. Ltd." ? `<img src="/Adarsha automotives pvt ltd.png" alt="Adarsha Automotives Pvt Ltd Seal" height="110px" width="110px" />` : ''}
            </div>
        </div>
    </div>
</div>
</body>
</html>
  `;
}
