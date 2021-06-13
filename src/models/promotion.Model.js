const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PromotionSchema = new schema({
  CompanyId: {
    type: String,
    unique: true,
    required: true,
  },
  Description: [
    {
      _id: { type: String },
      Discount: { type: String, require: true },
      StartDate: { type: String, require: true },
      EndDate: { type: String, require: true },
      Banner: { type: String, require: true },
    },
  ],
});

const Promation = mongoose.model('Promotion', PromotionSchema);
module.exports = Promation;
