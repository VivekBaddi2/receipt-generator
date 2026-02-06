import mongoose from 'mongoose';

const ReceiptSchema = new mongoose.Schema({
  receiptNo: {
    type: String,
    required: true,
    unique: true,
  },
  receiptDate: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    default: '2458017400',
  },
  address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amountInWords: {
    type: String,
    required: true,
  },
  hypothecatedTo: {
    type: String,
    required: true,
  },
  proprietor: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    default: 'For Vehicle allotment',
  },
  orderType: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    default: 'CASH',
  },
  chequeNo: {
    type: String,
    default: '',
  },
  depositBank: {
    type: String,
    default: '',
  },
  depositDate: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Receipt || mongoose.model('Receipt', ReceiptSchema);
