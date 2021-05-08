const { createToken } = require('./jwt.Service');
const { SendMailVetify } = require('./SendMail.Service');
const bcrypt = require('bcrypt');

const Company = require('../models/company.Model');

const SignupService = async (body) => {
  let {
    CompanyName,
    TIN,
    Address,
    BusinessLicense,
    Logo,
    CompanyGmail,
    Delegate,
  } = body;
  CompanyName = CompanyName.trim();
  TIN = TIN.trim();
  BusinessLicense = BusinessLicense.trim();
  Logo = Logo.trim();
  CompanyGmail = CompanyGmail.trim();
  Address = Address.trim();

  console.log(CompanyGmail);
  // check exist Gmail
  try {
    const result = await Company.find({ CompanyGmail });
    if (result) {
      if (result.length > 0) {
        return {
          msg: 'Gmail is existed',
          statusCode: 300,
        };
      } else {
        // Create new Customer
        // Hash password
        // const saltOrRound = 8;
        // const hassPassword = await bcrypt.hash(Password, saltOrRound);

        const newCompany = new Company({
          CompanyName,
          TIN,
          Address,
          BusinessLicense,
          Logo,
          CompanyGmail,
          Description: '',
          Delegate,
          Commission: '',
          RegistrationPackage: '',
          Status: 'false',
        });
        console.log('newComp', newCompany);
        // console.log(newCustomer.Gmail);
        // save Customer
        const resSave = await newCompany.save();
        return {
          msg: 'Sign Up Company Successful',
          statusCode: 200,
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while checking existed Company',
      statusCode: 300,
    };
  }
};

module.exports = { SignupService };
