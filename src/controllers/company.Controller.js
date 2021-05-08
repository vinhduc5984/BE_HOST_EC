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

module.exports = { signup };
