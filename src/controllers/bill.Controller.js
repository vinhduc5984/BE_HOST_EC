const controller = require('./index');
const BillService = require('../services/bill.Service');

const CreateBill = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const ResService = await BillService.CreateBill(tokenID, req.body);
  if (ResService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      ResService.data,
      ResService.statusCode,
      ResService.msg,
    );
  }
  return controller.sendSuccess(res, {}, ResService.statusCode, ResService.msg);
};

const ChangeStatusBill = async (req, res, next) => {
  const ResService = await BillService.ChangeStatusBill(req.body);
  if (ResService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      ResService.data,
      ResService.statusCode,
      ResService.msg,
    );
  }
  return controller.sendSuccess(res, {}, ResService.statusCode, ResService.msg);
};

const FindBillOfCustomer = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  console.log(tokenID);
  const ResService = await BillService.FindBillByID(tokenID);
  if (ResService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      ResService.data,
      ResService.statusCode,
      ResService.msg,
    );
  }
  return controller.sendSuccess(res, {}, ResService.statusCode, ResService.msg);
};

module.exports = { CreateBill, ChangeStatusBill, FindBillOfCustomer };
