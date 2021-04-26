const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AccountSchema = new schema({
  _id: { type: Number },
  Gmail: {
    type: String,
    unique: true,
    required: true,
  },
  Password: { type: String, required: true },
  Role: { type: String, required: true },
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
