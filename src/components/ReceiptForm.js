'use client';

import { useEffect, useState } from 'react';
import { generateReceiptNumber, numberToIndianWords, formatDate } from '../utils/helpers';

export default function ReceiptForm({ onSubmit, loading }) {
  // Fetch the next receipt number on component mount
  useEffect(() => {
    const fetchReceiptNumber = async () => {
      try {
        generateReceiptNumber().then(receiptNo => {
          setFormData(prev => ({
            ...prev,
            receiptNo
          }));
        });
      } catch (error) {
        console.error('Error fetching receipt number:', error);
      }
    };

    fetchReceiptNumber();
  }, []);

  const [formData, setFormData] = useState({
    receiptNo: "",
    receiptDate: new Date().toISOString().split('T')[0],
    name: '',
    customerId: '2458017400',
    address: '',
    amount: '',
    hypothecatedTo: 'AU SMALL FINANCE BANK',
    proprietor: '',
    remark: 'For Vehicle allotment',
    orderType: 'TAXI',
    model: '',
    paymentMode: 'CASH',
    chequeNo: '',
    depositBank: '',
    depositDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amountInWords = numberToIndianWords(parseFloat(formData.amount));
    const receiptDate = formatDate(formData.receiptDate);
    const depositDate = formData.depositDate ? formatDate(formData.depositDate) : '';

    const receipt = {
      ...formData,
      amount: parseFloat(formData.amount),
      amountInWords,
      receiptDate,
      depositDate,
    };

    onSubmit(receipt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Receipt Details */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Receipt No.
          </label>
          <input
            type="text"
            name="receiptNo"
            value={formData.receiptNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Receipt Date
          </label>
          <input
            type="date"
            name="receiptDate"
            value={formData.receiptDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Customer ID
          </label>
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
            readOnly
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Receipt Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hypothecated To
          </label>
          <select
            name="hypothecatedTo"
            value={formData.hypothecatedTo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="AU SMALL FINANCE BANK">AU SMALL FINANCE BANK</option>
            <option value="State Bank Of India">State Bank Of India</option>
            <option value="Cholamandalam Investment and Finance">Cholamandalam Investment and Finance</option>
            <option value="Federal Bank">Federal Bank</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Proprietor
          </label>
          <input
            type="text"
            name="proprietor"
            value={formData.proprietor}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Order/Inv No
          </label>
          <select
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="TAXI">TAXI</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Model
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Payment Mode
          </label>
          <input
            type="text"
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            DD/CC/Cheque No
          </label>
          <input
            type="text"
            name="chequeNo"
            value={formData.chequeNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deposit Bank Name
          </label>
          <input
            type="text"
            name="depositBank"
            value={formData.depositBank}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deposit Date
          </label>
          <input
            type="date"
            name="depositDate"
            value={formData.depositDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Amount Preview */}
      {formData.amount && (
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm font-semibold text-blue-900">
            Amount in Words:
          </p>
          <p className="text-lg text-blue-800 mt-1">
            {numberToIndianWords(parseFloat(formData.amount))}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating Receipt...' : 'Generate Receipt'}
      </button>
    </form>
  );
}
