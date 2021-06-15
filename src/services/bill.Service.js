const Bill = require('../models/bill.Model');
const Customer = require('../models/customer.Model');

// lập Bill
const CreateBill = async (TokenID, body) => {
  let {
    Sender,
    Receiver,
    ProductName,
    CompanyID,
    Cost,
    ModeofPayment,
    Notes,
    Status,
    CreateDate,
    DeliveryDate,
    ReceivedDate,
    CancelDate,
  } = body;

  const dataSender = await Customer.findById(TokenID);
  console.log(dataSender);
  if (!dataSender) {
    return {
      msg: 'Not found the sender',
      statusCode: 300,
    };
  }
  const reqData = {
    Sender: {
      id: dataSender._id,
      Name: `${dataSender.LastName}_${dataSender.FirstName}`,
      Phone: dataSender.Phone,
      Address: dataSender.Address,
    },
    Receiver,
    ProductName,
    CompanyID,
    Cost,
    ModeofPayment,
    Notes: Notes,
    Status,
    CreateDate,
    DeliveryDate,
    ReceivedDate,
    CancelDate,
  };
  console.log(reqData.Notes);

  const BillCustomer = new Bill(reqData);
  const BillRes = await BillCustomer.save();
  if (BillRes) {
    console.log(BillRes);
    return {
      msg: 'Create Bill successful',
      statusCode: 200,
    };
  } else {
    return {
      msg: 'Error while create Bill',
      statusCode: 300,
    };
  }
};

// thay đổi trạng thái đơn hàng

const defaultStatus = 'Da Huy';
const objStatus = {
  ChoXacNhan: 'Cho Xac Nhan',
  DangGiao: 'Dang Giao',
  DaGiao: 'Da Giao',
  DaHuy: 'Da Huy',
};
const getStatus = (objStatus, n) => {
  return objStatus[n] || defaultStatus;
};

const ChangeStatusBill = async (body) => {
  let { BillID, Status } = body;
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
  const currentDate = day + time;
  const DataBill = await Bill.findById(BillID);
  if (DataBill) {
    const statusBill = getStatus(objStatus, Status);
    if (Status === 'DangGiao') {
      DataBill.Status = getStatus(objStatus, Status);
      DataBill.DeliveryDate = currentDate;
    } else if (Status === 'DaGiao') {
      DataBill.Status = getStatus(objStatus, Status);
      DataBill.ReceivedDate = currentDate;
    } else if (Status === 'DaHuy') {
      DataBill.Status = getStatus(objStatus, Status);
      DataBill.CancelDate = currentDate;
    }
    await DataBill.save();
    return {
      msg: 'Update Status Bill Successful',
      statusCode: 200,
    };
  } else {
    return {
      msg: 'Update Status Bill fail',
      statusCode: 300,
    };
  }
};

// Tìm tất cả các hóa đơn của người dùng
const FindBillByID = async (TokenID) => {
  const count = 0;
  console.log(TokenID);
  const BillData = await Bill.find({ 'Sender.id': TokenID });
  console.log(BillData);
  // return {
  //   msg:"Chua co hoa don nao",
  //   statusCode:300,
  // }
  // await BillData.forEach(element => {
  //     if(element.Sender.id === TokenID)
  //     {
  //         count++;
  //     }
  // });
  if (BillData.length == 0) {
    return {
      msg: 'Chua co hoa don nao',
      statusCode: 300,
    };
  } else {
    return {
      msg: 'find Bill Successful',
      statusCode: 200,
      data: BillData,
    };
  }
};

module.exports = { CreateBill, ChangeStatusBill, FindBillByID };
