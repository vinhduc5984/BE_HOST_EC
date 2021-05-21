const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CostSheetSchema = new schema({
  CompanyId: {
    type: String,
    required: true,
    unique: true,
  },
  Kg: {
    type: String,
    required: true,
  },
  Cost: [
    {
      _id: String,
      Km: { type: String, require: true, unique: true },
      Cost: { type: String, require: true },
      DeliveryTime: { type: String, require: true },
      PromotionPrice: String,
      StartDate: String,
      EndDate: String,
    },
  ],
  Surcharge: {
    type: String,
    required: true,
  },
  VAT: {
    type: String,
    required: true,
  },
});

const CostSheet = mongoose.model('CostSheet', CostSheetSchema);
module.exports = CostSheet;
