const Bill = require('../models/bill.Model');
const Customer = require('../models/customer.Model');

// lập Bill
const CreateBill = async (TokenID, body) => {
  let {
    Sender,
    Receiver,
    ProductID,
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
  if (!dataSender) {
    return {
      msg: 'Not found the sender',
      statusCode: 300,
    };
  }
  const BillCustomer = new Bill({
    Sender: {
      id: TokenID,
      Name: `${dataSender.LastName}_${dataSender.FirstName}`,
      Phone: dataSender.Phone,
      Address: dataSender.Address,
    },
    Receiver,
    ProductID,
    CompanyID,
    Cost,
    ModeofPayment,
    Notes,
    Status,
    CreateDate,
    DeliveryDate,
    ReceivedDate,
    CancelDate,
  });

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
  ChoLayHang: 'Cho Lay Hang',
  DangGiao: 'Dang Giao',
  DaGiao: 'Da Giao',
  DaHuy: 'Da Huy',
};
const getStatus = (objStatus, n) => {
  return objStatus[n] || defaultStatus;
};

const ChangeStatusBill = async (body) => {
  let { BillID, Status } = body;
  const DataBill = await Bill.findById(BillID);
  if (DataBill) {
    DataBill.Status = getStatus(objStatus, Status);
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

module.exports = { CreateBill, ChangeStatusBill };
