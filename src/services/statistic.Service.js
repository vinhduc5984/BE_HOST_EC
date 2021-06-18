const dateFormat = require('dateformat');
const Revenue = require('../models/revenue.Model');
const Bill = require('../models/bill.Model');
const Account = require('../models/account.Model');

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

// thống kê danh sách đơn trạng thái chờ xác nhận (theo tháng)
const InvoiceStatisticChoXacNhan = async (tokenID) => {
  const id = +tokenID;
  const roleUser = await Account.findOne({ _id: id });
  console.log(roleUser);
  try {
    if (roleUser) {
      if (roleUser.Role === 'Admin') {
        const _Bill = await Bill.aggregate([
          { $match: { Status: 'Cho Xac Nhan' } }, // kiểm tra đk đúng
          /*{
          $project: {
            month: {$month: { $toDate: '$CreateDate' } }
          }
       },*/
          /*{$group: { // groupby theo id
          _id: {$substr: ['$bookingdatetime', 5, 2]}, 
          numberofbookings: {$sum: 1}
      }}*/
        ]);
        const newBill = _Bill.reduce((t, v) => {
          //console.log(t);

          const month = +v.CreateDate.split('/')[1];
          //console.log(month);
          t[month - 1] = t[month - 1] + 1;

          return t;
        }, new Array(12).fill(0));

        console.log(_Bill);
        return {
          msg: "get bill status = 'Cho Xac Nhan' success",
          statusCode: 200,
          data: newBill,
        };
      }
    } else {
      return {
        msg: 'get status bill false',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

// thống kê danh sách đơn trạng thái Đang giao (theo tháng)
const InvoiceStatisticDangGiao = async (tokenID) => {
  const id = +tokenID;
  const roleUser = await Account.findOne({ _id: id });
  console.log(roleUser);
  try {
    if (roleUser) {
      if (roleUser.Role === 'Admin') {
        const _Bill = await Bill.aggregate([
          { $match: { Status: 'Dang Giao' } }, // kiểm tra đk đúng
        ]);
        const newBill = _Bill.reduce((t, v) => {
          const month = +v.CreateDate.split('/')[1];
          t[month - 1] = t[month - 1] + 1;
          return t;
        }, new Array(12).fill(0));

        console.log(_Bill);
        return {
          msg: "get bill status = 'Dang Giao' success",
          statusCode: 200,
          data: newBill,
        };
      }
    } else {
      return {
        msg: 'get status bill false',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

// thống kê danh sách đơn trạng thái Đã giao (theo tháng)
const InvoiceStatisticDaGiao = async (tokenID) => {
  const id = +tokenID;
  const roleUser = await Account.findOne({ _id: id });
  console.log(roleUser);
  try {
    if (roleUser) {
      if (roleUser.Role === 'Admin') {
        const _Bill = await Bill.aggregate([
          { $match: { Status: 'Da Giao' } }, // kiểm tra đk đúng
        ]);
        const newBill = _Bill.reduce((t, v) => {
          const month = +v.CreateDate.split('/')[1];
          t[month - 1] = t[month - 1] + 1;
          return t;
        }, new Array(12).fill(0));

        console.log(_Bill);
        return {
          msg: "get bill status = 'Da giao' success",
          statusCode: 200,
          data: newBill,
        };
      }
    } else {
      return {
        msg: 'get status bill false',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

// thống kê danh sách đơn trạng thái Đã Hủy (theo tháng)
const InvoiceStatisticDaHuy = async (tokenID) => {
  const id = +tokenID;
  const roleUser = await Account.findOne({ _id: id });
  console.log(roleUser);
  try {
    if (roleUser) {
      if (roleUser.Role === 'Admin') {
        const _Bill = await Bill.aggregate([
          { $match: { Status: 'Da Huy' } }, // kiểm tra đk đúng
        ]);
        const newBill = _Bill.reduce((t, v) => {
          const month = +v.CreateDate.split('/')[1];
          t[month - 1] = t[month - 1] + 1;
          return t;
        }, new Array(12).fill(0));

        console.log(_Bill);
        return {
          msg: "get bill status = 'Da Huy' success",
          statusCode: 200,
          data: newBill,
        };
      }
    } else {
      return {
        msg: 'get status bill false',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  RevenueStatistic,
  InvoiceStatisticChoXacNhan,
  InvoiceStatisticDangGiao,
  InvoiceStatisticDaGiao,
  InvoiceStatisticDaHuy,
};
