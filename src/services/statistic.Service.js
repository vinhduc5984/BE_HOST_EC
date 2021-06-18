const dateFormat = require('dateformat');
const Revenue = require('../models/revenue.Model');

const RevenueStatistic = async (body) => {
  let { Value } = body;
  try {
    const revenue = await Revenue.find({});
    var n = 0;
    var arrRevenues = [];
    var objRevenue = {};
    var fromDate = new Date(Value.toString() + '/01/01');
    var toDate = new Date(Value.toString() + '/12/31');
    console.log(fromDate);
    console.log(toDate);

    var month = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    for (const k in month) {
      objRevenue = {};
      objRevenue.Month = month[k];
      objRevenue.InCome = 0;
      objRevenue.Expenditure = 0;
      objRevenue.Profit = 0;
      arrRevenues[n] = objRevenue;
      n++;
    }
    console.log(arrRevenues);

    for (const i in revenue) {
      objRevenue = {};
      const data = revenue[i];
      var createDate = data.CreateDate;
      var CreateDate = createDate.split('/');
      CreateDate = new Date(CreateDate[2], CreateDate[1] - 1, CreateDate[0]);
      if (CreateDate >= fromDate && CreateDate <= toDate) {
        objRevenue.Month = CreateDate.getMonth() + 1;
        objRevenue.InCome = data.Income;
        objRevenue.Expenditure =
          Number(data.TradeCreditors) + Number(data.OtherPayable);
        objRevenue.Profit = data.Profit;

        var index = Number(objRevenue.Month) - 1;
        arrRevenues[index] = objRevenue;
      }
    }

    console.log(arrRevenues);
    return {
      msg: 'Revenue Statistic successful',
      statusCode: 200,
      data: arrRevenues,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error Revenue Statistic',
      statusCode: 300,
    };
  }
};

module.exports = { RevenueStatistic };
