'use client';

import { useState, useEffect } from 'react';
import { generateReceiptHTML } from '../utils/receiptTemplate';

export default function ReceiptHistory({ onViewReceipt }) {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBank, setFilterBank] = useState('all');

    useEffect(() => {
        fetchReceipts();
    }, []);

    const fetchReceipts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/receipts');

            if (!response.ok) {
                throw new Error('Failed to fetch receipts');
            }

            const data = await response.json();
            setReceipts(data.receipts || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching receipts:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (receiptNo) => {
        if (!confirm(`Are you sure you want to delete receipt ${receiptNo}?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/receipts/${receiptNo}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete receipt');
            }

            // Refresh the list
            fetchReceipts();
            alert('Receipt deleted successfully');
        } catch (err) {
            console.error('Error deleting receipt:', err);
            alert('Failed to delete receipt');
        }
    };

    const handleDownloadPDF = async (receipt) => {
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const htmlContent = generateReceiptHTML(receipt);

            const opt = {
                margin: [5, 5, 5, 5],
                filename: `receipt-${receipt.receiptNo}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' },
            };

            html2pdf().set(opt).from(htmlContent).save();
        } catch (err) {
            console.error('Error downloading PDF:', err);
            alert('Failed to download PDF');
        }
    };

    // Filter receipts
    const filteredReceipts = receipts.filter((receipt) => {
        const matchesSearch =
            receipt.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.model.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesBank =
            filterBank === 'all' || receipt.hypothecatedTo === filterBank;

        return matchesSearch && matchesBank;
    });

    if (loading) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading receipts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h3 className="text-red-800 font-semibold mb-2">Error Loading Receipts</h3>
                    <p className="text-red-600 text-sm">{error}</p>
                    <p className="text-red-600 text-sm mt-2">
                        Make sure MongoDB is connected. Check your .env.local file.
                    </p>
                    <button
                        onClick={fetchReceipts}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Receipt History</h2>
                <button
                    onClick={fetchReceipts}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md text-sm"
                >
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search by receipt no, name, or model..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Filter by Bank
                    </label>
                    <select
                        value={filterBank}
                        onChange={(e) => setFilterBank(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Banks</option>
                        <option value="AU SMALL FINANCE BANK">AU SMALL FINANCE BANK</option>
                        <option value="State Bank Of India">State Bank Of India</option>
                        <option value="Cholamandalam Investment and Finance">Cholamandalam Investment and Finance</option>
                        <option value="Federal Bank">Federal Bank</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredReceipts.length} of {receipts.length} receipts
            </div>

            {/* Receipts List */}
            {filteredReceipts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No receipts found</p>
                    <p className="text-gray-400 text-sm mt-2">
                        {receipts.length === 0
                            ? "Create your first receipt to see it here"
                            : "Try adjusting your search or filters"}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredReceipts.map((receipt) => (
                        <div
                            key={receipt._id}
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                {/* Receipt Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {receipt.receiptNo}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {receipt.receiptDate}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Name:</span>{' '}
                                            <span className="font-semibold text-gray-900">{receipt.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Amount:</span>{' '}
                                            <span className="font-semibold text-green-600">
                                                ₹{receipt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Model:</span>{' '}
                                            <span className="font-semibold text-gray-900">{receipt.model}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Bank:</span>{' '}
                                            <span className="font-semibold text-gray-900">{receipt.hypothecatedTo}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row md:flex-col gap-2 md:w-48">
                                    <button
                                        onClick={() => onViewReceipt(receipt)}
                                        className="self-end w-full md:w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-200"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDownloadPDF(receipt)}
                                        className="self-end w-full md:w-[50%] bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-200"
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => handleDelete(receipt.receiptNo)}
                                        className="self-end w-full md:w-[50%] bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            {receipts.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-600 font-semibold">Total Receipts</p>
                        <p className="text-2xl font-bold text-blue-900">{receipts.length}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-600 font-semibold">Total Amount</p>
                        <p className="text-2xl font-bold text-green-900">
                            ₹{receipts.reduce((sum, r) => sum + r.amount, 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <p className="text-sm text-purple-600 font-semibold">This Month</p>
                        <p className="text-2xl font-bold text-purple-900">
                            {receipts.filter(r => {
                                const receiptDate = new Date(r.createdAt);
                                const now = new Date();
                                return receiptDate.getMonth() === now.getMonth() &&
                                    receiptDate.getFullYear() === now.getFullYear();
                            }).length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}