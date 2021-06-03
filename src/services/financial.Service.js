const bcrypt = require('bcrypt');
const dateFormat = require('dateformat');
const Bill = require('../models/bill.Model');
const company = require('../models/company.Model');
const Accounting = require('../models/accounting.Model');
const Revenue = require('../models/revenue.Model');

const createAccounting = async (body) => {
  let { CreateDate } = body;

  try {
    const accounting = await Accounting.find({ CreateDate });
    var createDate = CreateDate.split('/');
    //var createDate=new Date(CreateDate);
    if (accounting.length > 0) {
      return {
        msg: 'exits accounting',
        statusCode: 300,
      };
    } else {
      const dataCom = await company.find({});
      var objComs = [];
      var TotalIncome = 0;
      var TotalPayable = 0;

      var n = 0;

      for (const i in dataCom) {
        const CompanyID = dataCom[i]._id;
        const bill = await Bill.find({ CompanyID });
        if (bill.length > 0) {
          var objCom = {};
          for (const j in bill) {
            var ReceivedDate = bill[j].ReceivedDate;
            var receivedDate = ReceivedDate.split('/');

            if (
              Number(createDate[1]) == Number(receivedDate[1]) &&
              Number(createDate[2]) == Number(receivedDate[2])
            ) {
              if (Object.keys(objCom) <= 0) {
                objCom.Id = CompanyID;
                objCom.Number = 1;
                objCom.Total = Number(bill[j].Cost) * 1000;
                objCom.ExpensePayable =
                  Number(objCom.Total) *
                  Number((100 - dataCom[i].Commission) / 100);
              } else {
                objCom.Id = CompanyID;
                objCom.Number = Number(objCom.Number) + 1;
                objCom.Total =
                  Number(objCom.Total) + Number(bill[j].Cost) * 1000;
                objCom.ExpensePayable =
                  Number(objCom.Total) *
                  Number((100 - dataCom[i].Commission) / 100);
              }
            }
          }
          objComs[n] = objCom;
          TotalIncome = Number(TotalIncome) + Number(objCom.Total);
          TotalPayable = Number(TotalPayable) + Number(objCom.ExpensePayable);
          n++;
        }
      }
    }
    console.log(objComs);
    var Company = objComs;
    const NewAccounting = new Accounting({
      CreateDate,
      Company,
      TotalIncome,
      TotalPayable,
    });
    await NewAccounting.save();
    return {
      msg: 'Create Accounting Successful',
      statusCode: 200,
      data: NewAccounting,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error Create Accounting',
      statusCode: 300,
    };
  }
};

const getAccounting = async (body) => {
  let { CreateDate, Id } = body;
  try {
    const accounting = await Accounting.find({ CreateDate });
    if (accounting.length <= 0) {
      return {
        msg: 'not found accounting',
        statusCode: 300,
      };
    } else {
      if (Id) {
        const company = accounting[0].Company;
        for (const i in company) {
          if (company[i].Id == Id) {
            const Company = company[i];
            return {
              msg: 'Get data Company Accounting successful',
              statusCode: 200,
              data: { CreateDate, Company },
            };
          }
        }
        return {
          msg: 'not found CompanyId',
          statusCode: 300,
        };
      } else {
        return {
          msg: 'get data accounting successful',
          statusCode: 200,
          data: accounting,
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error get Accounting',
      statusCode: 300,
    };
  }
};

const createRevenue = async (body) => {
  let { CreateDate, OtherPayable } = body;

  try {
    const revenue = await Revenue.find({ CreateDate });

    if (revenue.length > 0) {
      return {
        msg: 'exits revenue',
        statusCode: 300,
      };
    } else {
      const accounting = await Accounting.find({ CreateDate });
      if (accounting.length <= 0) {
        return {
          msg: 'Please Caculator Accouting before Caculator Revenue',
          statusCode: 300,
        };
      } else {
        const Income = accounting[0].TotalIncome;
        const TradeCreditors = accounting[0].TotalPayable;
        const Profit =
          Number(Income) - Number(TradeCreditors) - Number(OtherPayable);
        const NewRevenue = new Revenue({
          CreateDate,
          Income,
          TradeCreditors,
          OtherPayable,
          Profit,
        });
        await NewRevenue.save();
        return {
          msg: 'Create Revenue Successful',
          statusCode: 200,
          data: NewRevenue,
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error Create Accounting',
      statusCode: 300,
    };
  }
};

const getRevenue = async (body) => {
  let { CreateDate } = body;
  try {
    const revenue = await Revenue.find({ CreateDate });
    console.log(revenue);
    if (revenue.length <= 0) {
      return {
        msg: 'not found revenue',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'get data revenue successful',
        statusCode: 200,
        data: revenue,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error get Revenue',
      statusCode: 300,
    };
  }
};

module.exports = {
  createAccounting,
  getAccounting,
  createRevenue,
  getRevenue,
};
