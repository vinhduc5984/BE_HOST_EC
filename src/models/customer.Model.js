const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CustommerSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Gmail: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
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
    Role: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

CustommerSchema.plugin(AutoIncrement); // này cho trường tăng tự động _id
const Customer = mongoose.model('Customer', CustommerSchema);
module.exports = Customer;
