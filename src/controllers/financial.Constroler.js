const controller = require('./index');
const Financial = require('../services/financial.Service');

const createAccounting = async (req, res, next) => {
  const ResService = await Financial.createAccounting(req.body);
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

const getAccounting = async (req, res, next) => {
  const ResService = await Financial.getAccounting(req.body);
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

const deleteAccounting = async (req, res, next) => {
  const ResService = await Financial.deleteAccounting(req.body);
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

const createRevenue = async (req, res, next) => {
  const ResService = await Financial.createRevenue(req.body);
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

const getRevenue = async (req, res, next) => {
  const ResService = await Financial.getRevenue(req.body);
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

const deleteRevenue = async (req, res, next) => {
  const ResService = await Financial.deleteRevenue(req.body);
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
module.exports = {
  createAccounting,
  getAccounting,
  deleteAccounting,
  createRevenue,
  getRevenue,
  deleteRevenue,
};
