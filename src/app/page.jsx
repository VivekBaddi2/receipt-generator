'use client';

import { useState } from 'react';
import ReceiptForm from '../components/ReceiptForm';
import ReceiptPreview from '../components/ReceiptPreview';
import ReceiptHistory from '../components/ReceiptHistory';

export default function Home() {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  const handleSubmit = async (receiptData) => {
    setLoading(true);
    try {
      // Preview the receipt
      setReceipt(receiptData);
      setActiveTab('preview');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate receipt');
    } finally {
      setLoading(false);
    }
  };



  const handleViewReceipt = (receiptData) => {
    setReceipt(receiptData);
    setActiveTab('preview');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Receipt Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create professional, print-ready receipts
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${activeTab === 'create'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Create Receipt
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${activeTab === 'preview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
              disabled={!receipt}
            >
              Preview Receipt
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Receipt History
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'create' && (
            <ReceiptForm onSubmit={handleSubmit} loading={loading} />
          )}

          {activeTab === 'preview' && receipt && (
            <div className="space-y-6">
              <ReceiptPreview receipt={receipt} />
              <div className="flex justify-center">
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-md transition duration-200"
                >
                  Create New Receipt
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <ReceiptHistory onViewReceipt={handleViewReceipt} />
          )}

        </div>
      </div>
    </main>
  );
}
