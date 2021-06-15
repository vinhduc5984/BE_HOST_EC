const controller = require('./index');
const ServicePackageController = require('../services/servicepackage.Service');

const creatpackage = async (req, res, next) => {
  const resService = await ServicePackageController.creatPackage(req.body);
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

const getpackage = async (req, res, next) => {
  const resService = await ServicePackageController.getPackage(req.body);
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

const editpackage = async (req, res, next) => {
  const resService = await ServicePackageController.editPackage(req.body);
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

const deletepackage = async (req, res, next) => {
  const resService = await ServicePackageController.deletePackage(req.body);
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
  creatpackage,
  getpackage,
  editpackage,
  deletepackage,
};
