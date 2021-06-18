const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AccountSchema = new schema({
  _id: { type: schema.Types.ObjectID },
  Gmail: {
    type: String,
    unique: true,
    required: true,
  },
  Password: { type: String, required: true },
  Role: { type: String, required: true },
  Vetify: { type: String },
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
