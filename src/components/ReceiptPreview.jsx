'use client';

import { useRef } from 'react';

export default function ReceiptPreview({ receipt }) {
  const receiptRef = useRef(null);

  const saveReceipt = async () => {
    if (!receiptRef.current) return;

    const response = await fetch('/api/save-receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receipt),
    });

    if (!response.ok) {
      alert('Failed to save receipt before downloading PDF.');
      return;
    }
  };

  if (!receipt) return null;

  return (
    <div className="receipt-preview-container p-4 ">
      <style jsx>{`
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
            table-layout: fixed; /* Critical for html2pdf */
        }

        thead tr th {
            border: 2px solid black;
            border-right: 0px;
            border-left: 0px;
            box-sizing: border-box; /* Add this */
        }

        tbody tr td {
            padding-top: 2px;
            text-align: center;
            vertical-align: top;
            box-sizing: border-box; /* Add this */
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
            font-size: 11px;
        }
        .terms-signature-container{
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 10px;
            width: 100%;
            margin: auto auto;
        }
        .amount-words {
          padding: 0px 12px;
          padding-left: 0px;  
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
      `}</style>



      <div ref={receiptRef} className="container font-bold overflow-auto p-0" style={{ background: 'white' }}>
        <div className="heading">
          <h1>RECEIPT</h1>
        </div>
        <div className="releaseVersion">
          Rel 2.0.12
        </div>
        <div className="receiptDataContainer">
          <div className="leftDiv">
            <div className="row">
              <div className="rowLabel">Receipt No</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.receiptNo}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Name</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.name.toUpperCase()}</div>
              </div>
            </div>
            <div id="address" className="row">
              <div className="rowLabel">Address</div>
              <div className="rowValue">
                <div>:</div>
                <div style={{ width: "100%" }}>{receipt.address.toUpperCase()}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Remark</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.remark}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Order/Inv No</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.orderType}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Model</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.model === "Other" ? receipt.modelOther : receipt.model}</div>
              </div>
            </div>
          </div>
          <div className="rightDiv">
            <div className="row">
              <div className="rowLabel">Receipt Date</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.receiptDate}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Customer ID</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.customerId}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Receipt Amount</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.amount.toFixed(2)}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Hypothecated To</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.hypothecatedTo}</div>
              </div>
            </div>
            <div className="row">
              <div className="rowLabel">Proprietor</div>
              <div className="rowValue">
                <div>:</div>
                <div>{receipt.proprietor.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="table">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Srl.</th>
                <th style={{ width: "12%" }}>Mode</th>
                <th style={{ width: "15%" }}>DD/CC/CHQ No./UTR</th>
                <th style={{ width: "12%" }}>Favouring</th>
                <th style={{ width: "15%" }}>Deposit Date</th>
                <th style={{ width: "26%" }}></th>
                <th style={{ width: "15%" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{receipt.paymentMode}</td>
                <td>{receipt.chequeNo}</td>
                <td></td>
                <td>{receipt.depositDate}</td>
                <td></td>
                <td>{receipt.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="total-section">
          <div className="total-row">
            <div className="total-label">Total :</div>
            <div className="total-value">{receipt.amount.toFixed(2)}</div>
          </div>
        </div>
        <div className="amount-words">
          <strong>Amounts in words : {receipt.amountInWords}</strong>
        </div>
        <div className="terms-signature-container">
          <div className="terms-section">
            <div style={{ fontWeight: "bold" }}>Terms and conditions</div>
            <div>
              <strong>1)</strong> This receipt issued subject to realisation of cheque / DD /Pay order / Cash
              <br />
              <strong> 2)</strong> Prices are subject to change without prior notice <br />
              <strong>3)</strong> Prices Ruling to same of dlivery will be Payment is received Original receipts
              is must be produced before taking delivery of vehicle <br />
              <strong>4)</strong> This Receipt is valid after clearance of cheques/ DD.
            </div>
          </div>
          <div className="signature-section relative flex flex-col gap-16 items-end font-bold">
            <div>For {receipt.for}</div>
            <div>(Authorized Signatory)</div>
            <div className='absolute top-[50%] left-[65%] -translate-y-[50%]'>
              {receipt.seal === "yes" && receipt.for === "OM SAI MOTORS PVT. LTD." && (
                <img src="/Om sai motors.png" alt="Om sai motors seal" height={"130px"} width={"130px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "SEHGAL AUTORIDERS PVT. LTD." && (
                <img src="/Sehgal Autoriders Pvt Ltd.png" alt="Sehgal autoriders seal" height={"130px"} width={"130px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "AUTOFIN LIMITED" && (
                <img src="/Autofin Ltd.png" alt="Autofin Ltd Seal" height={"110px"} width={"110px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "SUMANKIRTI CARS PVT. LTD." && (
                <img src="/Sumankirti.png" alt="Sumankirti Cars Pvt Ltd Seal" height={"100px"} width={"100px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "Varun Motors Pvt. Ltd." && (
                <img src="/Varun Motors pvt ltd.png" alt="Varun Motors Pvt Ltd Seal" height={"100px"} width={"100px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "Sai Point Cars Pvt. Ltd." && (
                <img src="/Sai Point Cars pvt ltd.png" alt="Sai Point Cars Pvt Ltd Seal" height={"100px"} width={"100px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "Kothari Auto Wheels Pvt. Ltd." && (
                <img src="/Kothari Auto Wheels pvt ltd.png" alt="Kothari Auto Wheels Pvt Ltd Seal" height={"110px"} width={"110px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "MSA Motors" && (
                <img src="/MSA motors.png" alt="MSA Motors Seal" height={"100px"} width={"100px"} />
              )}
              {receipt.seal === "yes" && receipt.for === "Adarsha Automotives Pvt. Ltd." && (
                <img src="/Adarsha automotives pvt ltd.png" alt="Adarsha Automotives Pvt Ltd Seal" height={"100px"} width={"100px"} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-center">
        <button
          onClick={() => { saveReceipt(); window.print(); }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Print
        </button>
        <button
          onClick={() => { saveReceipt() }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
