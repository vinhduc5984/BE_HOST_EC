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
        console.log('newComp1111');
        const newCompany = new Company({
          CompanyName,
          TIN,
          Address,
          BusinessLicense,
          Logo,
          CompanyGmail: CompanyGmail,
          Description: '',
          Delegate,
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

const getDataCompanies = async (body) => {
  let { id } = body;
  const DataCom = await Company.findById(id);
  console.log(DataCom);
  if (!DataCom) {
    return {
      msg: 'not found data Com',
      statusCode: 300,
    };
  } else {
    return {
      msg: 'get data company successful',
      statusCode: 200,
      data: DataCom,
    };
  }
};

const getListCompanyToVerify = async () => {
  const DataCom = await Company.find({ Status: 'false' });
  const length = DataCom.length;
  console.log(DataCom[0].Delegate.FirstName);

  if (length == 0) {
    return {
      msg: 'Not get list data Company',
      statusCode: 300,
    };
  } else {
    console.log(length);
    return {
      msg: 'get list data Company Successful',
      statusCode: 200,
    };
  }
};

module.exports = { SignupService, getDataCompanies, getListCompanyToVerify };
