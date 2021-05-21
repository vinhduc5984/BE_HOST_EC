const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CompanySchema = new schema({
  TIN: {
    type: String,
    required: true,
  },
  BusinessLicense: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  CompanyGmail: {
    type: String,
    required: true,
    unique: true,
  },
  Logo: {
    type: String,
  },
  Description: {
    type: String,
    default: '',
  },
  Delegate: {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Position: {
      type: String,
      required: true,
    },
  },
  Commission: {
    // tiền hoa hồng
    type: Number,
    default: 0,
  },
  RegistrationPackage: {
    type: String,
  },
  Status: {
    type: String,
  },
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
