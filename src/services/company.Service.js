const { createToken } = require('./jwt.Service');
const { SendMailVetify } = require('./SendMail.Service');
const bcrypt = require('bcrypt');

const Company = require('../models/company.Model');
const CostSheet = require('../models/costSheet.Model');
const Account = require('../models/account.Model');
const { findById } = require('../models/company.Model');
const feedBack = require('../models/feedback.Model');

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
  Addrexss = Address.trim();

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
        const GmailAccount = await Account.findOne({ Gmail: CompanyGmail });

        if (GmailAccount != null) {
          return {
            msg: 'Gmail is existed',
            statusCode: 300,
          };
        } else {
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
            RegistrationPackage: [],
            Status: 'false',
            Commission: '0',
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
      DataCompanyID.push(DataCom[i]);
    }
    console.log(length);
    return {
      msg: 'get list data Company Successful',
      statusCode: 200,
      data: DataCompanyID,
    };
  }
};

/*const getListCompany = async () => {
  // get list company with status = true
  const DataCom = await Company.find({ Status: 'true' });
  const length = DataCom.length;
  const DataCompany = [];
  if (length == 0) {
    return {
      msg: 'Not get list data Company',
      statusCode: 300,
    };
  } else {
    for (let i = 0; i < length; i++) {
      //console.log(DataCom[i]._id);
      DataCompany.push(DataCom[i]);
    }
    console.log(length);
    return {
      msg: 'get list data Company Successful',
      statusCode: 200,
      data: DataCompanyID,
    };
  }
};*/

const getListCompany = async () => {
  // get list company with status = true
  const DataCom = await Company.find({ Status: 'true' });
  const length = DataCom.length;
  const DataCompany = [];
  if (length == 0) {
    return {
      msg: 'Not get list data Company',
      statusCode: 300,
    };
  } else {
    for (let i = 0; i < length; i++) {
      //console.log(DataCom[i]._id);
      DataCompany.push(DataCom[i]);
    }
    console.log(length);
    return {
      msg: 'get list data Company Successful',
      statusCode: 200,
      data: DataCompany,
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
  if (costSheet.length <= 0) {
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

const editCostSheet = async (body) => {
  let { CompanyId, Kg, Cost, Surcharge, VAT } = body;
  try {
    const costSheet = await CostSheet.find({ CompanyId });
    console.log(costSheet);
    if (costSheet.length <= 0) {
      return {
        msg: 'not found CostSheet of Company',
        statusCode: 300,
      };
    } else {
      const value = { CompanyId, Kg, Cost, Surcharge, VAT };
      const resave = await CostSheet.updateOne({ CompanyId }, value);
      const NewCostSheet = await CostSheet.find({ CompanyId });
      return {
        msg: 'update CostSheet of company successful',
        statusCode: 200,
        data: NewCostSheet,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while update CostSheet of company',
      statusCode: 300,
    };
  }
};

const deleteCostSheet = async (body) => {
  let { CompanyId } = body;
  try {
    const costSheet = await CostSheet.find({ CompanyId });
    console.log(costSheet);
    if (costSheet.length <= 0) {
      return {
        msg: 'not found CostSheet of Company',
        statusCode: 300,
      };
    } else {
      const del = await CostSheet.deleteOne({ CompanyId });
      return {
        msg: 'delete CostSheet of company successful',
        statusCode: 200,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while delete CostSheet of company',
      statusCode: 300,
    };
  }
};

const deleteKm = async (body) => {
  let { CompanyId, Km } = body;
  try {
    const company = await CostSheet.find({ CompanyId });
    if (company.length <= 0) {
      return {
        msg: 'not found CostSheet of Company',
        statusCode: 300,
      };
    } else {
      const Cost = company[0].Cost;

      const popCost = Cost[Cost.length - 1];
      if (Km == popCost.Km) {
        Cost.pop();
      } else {
        Km = Number(Km);
        for (const j in Cost) {
          const km = Number(Cost[j].Km);
          if (km == Km) {
            Cost.splice(j, 1);
            break;
          }
          return {
            msg: 'not found Km of Cosheet',
            statusCode: 200,
          };
        }
      }
      const Kg = company[0].Kg;
      const Surcharge = company[0].Surcharge;
      const VAT = company[0].VAT;
      const value = { CompanyId, Kg, Cost, Surcharge, VAT };

      const resave = await CostSheet.updateOne({ CompanyId }, value);

      return {
        msg: 'delete Km of CostSheet successful',
        statusCode: 200,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while delete Km of CostSheet',
      statusCode: 300,
    };
  }
};

// phê duyệt company
const approveCompany = async (body) => {
  let { CompanyID, Commission } = body;
  var today = new Date();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var day =
    today.getDate() +
    '/' +
    (today.getMonth() + 1) +
    '/' +
    today.getFullYear() +
    ' - ';
  var endday =
    today.getDate() +
    '/' +
    (today.getMonth() + 1 + 1) +
    '/' +
    today.getFullYear() +
    ' - ';
  const FeeRegistrationPackage = {
    PackageID: '0',
    StartDate: day,
    EndDate: endday,
    Quantity: 50,
  };
  const RegisterPackage = [];
  RegisterPackage.push(FeeRegistrationPackage);
  const DataCom = await Company.findById(CompanyID);
  try {
    if (DataCom) {
      DataCom.Commission = Commission;
      DataCom.RegistrationPackage.push(FeeRegistrationPackage);
      DataCom.Status = 'true';
      console.log('Truoc Datacom.save()');
      await DataCom.save();
      console.log('Sau Datacom.save()');
      const rand = require('random');
      let random = rand.int((min = 0), (max = 999999));
      const saltOrRound = 8;
      const hassPassword = await bcrypt.hash(random.toString(), saltOrRound);

      const companyAccount = new Account({
        _id: DataCom._id.toString(),
        Gmail: DataCom.CompanyGmail,
        Password: hassPassword,
        Role: 'Company',
        Vetify: 'true',
      });
      await companyAccount.save();
      await SendMailVetify(
        DataCom.CompanyGmail,
        'Tài khoản của công ty',
        'Tài khoản là Email công ty, ' + 'Mật khẩu: ' + random,
        null,
      );
      return {
        msg: 'Approve Company successful',
        statusCode: 200,
        data: DataCom,
      };
    } else {
      return {
        msg: 'Approve Company false',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while found company',
      statusCode: 300,
    };
  }
};

const getFeedback = async (body) => {
  let { CompanyId } = body;
  try {
    const company = await feedBack.find({ CompanyId });
    if (company.length > 0) {
      return {
        msg: 'get FeedBack Successful!',
        statusCode: 200,
        data: company,
      };
    } else {
      return {
        msg: 'Company not have FeedBack',
        statusCode: 300,
      };
    }
  } catch (err) {
    return {
      msg: 'Error whilte get FeedBack',
      statusCode: 300,
    };
  }
};

module.exports = {
  SignupService,
  getListCompanyToVerify,
  getDataCompanies,
  creatCostSheet,
  getCostSheet,
  getListCompanyToVerify,
  getListCompany,
  editCostSheet,
  deleteCostSheet,
  deleteKm,
  approveCompany,
  getFeedback,
};
