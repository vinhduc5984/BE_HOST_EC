const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RevenueSchema = new schema({
  CreateDate: {
    type: String,
    required: true,
    unique: true,
  },
  Income: {
    type: String,
    required: true,
  },
  TradeCreditors: {
    type: String,
    required: true,
  },

  OtherPayable: {
    type: String,
    required: true,
  },
  Profit: {
    type: String,
    required: true,
  },
});

const Revenue = mongoose.model('Revenue', RevenueSchema);
module.exports = Revenue;
