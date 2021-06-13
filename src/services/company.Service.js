const { createToken } = require('./jwt.Service');
const { SendMailVetify } = require('./SendMail.Service');
const bcrypt = require('bcrypt');

const Company = require('../models/company.Model');
const CostSheet = require('../models/costSheet.Model');

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
          Commission: 0,
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
  const DataCompanyID = []; // lấy list is của các công ty có status = false để verify
  console.log(DataCom[0].Delegate.FirstName);

  if (length == 0) {
    return {
      msg: 'Not get list data Company',
      statusCode: 300,
    };
  } else {
    for (let i = 0; i < length; i++) {
      //console.log(DataCom[i]._id);
      DataCompanyID.push(DataCom[i]._id);
    }
    console.log(length);
    return {
      msg: 'get list data Company Successful',
      statusCode: 200,
      data: DataCompanyID,
    };
  }
};

const creatCostSheet = async (body) => {
  let { CompanyId, Kg, Cost, Surcharge, VAT } = body;

  try {
    const company = await CostSheet.find({ CompanyId });
    if (company) {
      if (company.length > 0) {
        return {
          msg: 'CostSheet of Company is existed',
          statusCode: 300,
        };
      } else {
        console.log('newCostSheet');
        const newCostSheet = new CostSheet({
          CompanyId,
          Kg,
          Cost,
          Surcharge,
          VAT,
        });
        console.log('newCostSheet', newCostSheet);
        const resSave = await newCostSheet.save();
        return {
          msg: 'Create new CostSheet Successful',
          statusCode: 200,
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error Create CostSheet',
      statusCode: 300,
    };
  }
};

const getCostSheet = async (body) => {
  let { CompanyId } = body;
  const costSheet = await CostSheet.find({ CompanyId });
  console.log(costSheet);
  if (!costSheet) {
    return {
      msg: 'not found CostSheet of Company',
      statusCode: 300,
    };
  } else {
    return {
      msg: 'get data CostSheet of company successful',
      statusCode: 200,
      data: costSheet,
    };
  }
};

module.exports = {
  SignupService,
  getDataCompanies,
  creatCostSheet,
  getCostSheet,
  getListCompanyToVerify,
};
