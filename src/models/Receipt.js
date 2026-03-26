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
    required: false,
  },
  hypothecatedOther: {
    type: String,
    required: false,
  },
  proprietor: {
    type: String,
    required: false,
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
  modelOther: {
    type: String,
    default: '',
  },
  paymentMode: {
    type: String,
    required: true,
  },
  chequeNo: {
    type: String,
    default: '',
  },
  // depositBank: {
  //   type: String,
  //   default: '',
  // },
  depositDate: {
    type: String,
    default: '',
  },
  for: {
    type: String,
    default: '',
  },
  seal: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Receipt || mongoose.model('Receipt', ReceiptSchema);
