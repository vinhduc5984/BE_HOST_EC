const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  Sender: {
    id: {
      type: Number,
    },
    Name: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  Receiver: {
    Name: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  ProductName: {
    type: [String],
    required: true,
    default: [],
  },
  CompanyID: {
    type: String,
    required: true,
  },
  Cost: {
    type: String,
    required: true,
  },
  ModeofPayment: {
    type: String,
    required: true,
  },
  Notes: {
    type: String,
  },
  Status: {
    type: String,
    required: true,
  },
  CreateDate: {
    type: String,
    required: true,
  },
  DeliveryDate: {
    type: String,
    required: true,
  },
  ReceivedDate: {
    type: String,
    required: true,
  },
  CancelDate: {
    type: String,
    required: true,
  },
});

const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;
