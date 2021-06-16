const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ServicePackageSchema = new schema({
  Name: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

const ServicePackage = mongoose.model('ServicePackage', ServicePackageSchema);
module.exports = ServicePackage;
