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
    TotalBillCost: { type: String, require: true },
    ServicePack: { type: String, retuire: true },
    ExpensePayable: { type: String, require: true },
    ActualExpenses: { type: String, require: true },
  },

  TotalIncomeofBill: {
    type: String,
    required: true,
  },
  TotalIncomeofServicePack: {
    type: String,
    required: true,
  },
  TotalPayable: {
    type: String,
    required: true,
  },
  TotalActualExpenses: { type: String, require: true },
});

const Accounting = mongoose.model('Accounting', AccountingSchema);
module.exports = Accounting;
