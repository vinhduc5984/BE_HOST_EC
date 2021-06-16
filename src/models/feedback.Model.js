const mongoose = require('mongoose');
const schema = mongoose.Schema;

const FeedBackSchema = new schema({
  UserId: {
    type: String,
    required: true,
  },
  CompanyId: { type: String, required: true },
  Description: { type: String, required: true },
  CreateDate: { type: String, required: true },
});

const FeedBack = mongoose.model('FeedBack', FeedBackSchema);
module.exports = FeedBack;
