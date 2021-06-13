const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AccountingSchema = new schema({
  CreateDate: {
    type: String,
    required: true,
    unique: true,
  },
  Company: [
    {
      _id: String,
      Id: String,
      Number: { type: String, require: true },
      Total: { type: String, require: true },
      ExpensePayable: { type: String, require: true },
    },
  ],
  TotalIncome: {
    type: String,
    required: true,
  },
  TotalPayable: {
    type: String,
    required: true,
  },
});

const Accounting = mongoose.model('Accounting', AccountingSchema);
module.exports = Accounting;
