const controller = require('./index');
const CompanyService = require('../services/company.Service');

const signup = async (req, res, next) => {
  const resService = await CompanyService.SignupService(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const getdatacom = async (req, res, next) => {
  const resService = await CompanyService.getDataCompanies(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const GetListDataToVerify = async (req, res, next) => {
  const resService = await CompanyService.getListCompanyToVerify();
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const GetListCompanyTrue = async (req, res, next) => {
  const resService = await CompanyService.getListCompany();
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const createcostsheet = async (req, res, next) => {
  const resService = await CompanyService.creatCostSheet(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const getdatacost = async (req, res, next) => {
  const resService = await CompanyService.getCostSheet(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const editcostsheet = async (req, res, next) => {
  const resService = await CompanyService.editCostSheet(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const deletecostsheet = async (req, res, next) => {
  const resService = await CompanyService.deleteCostSheet(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const deletekm = async (req, res, next) => {
  const resService = await CompanyService.deleteKm(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const approveCom = async (req, res, next) => {
  const resService = await CompanyService.approveCompany(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const getfeedback = async (req, res, next) => {
  const resService = await CompanyService.getFeedback(req.body);
  if (resService.statusCode === 200) {
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  }
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

module.exports = {
  signup,
  getdatacom,
  createcostsheet,
  getdatacost,
  editcostsheet,
  deletecostsheet,
  deletekm,
  GetListDataToVerify,
  GetListCompanyTrue,
  approveCom,
  getfeedback,
};
