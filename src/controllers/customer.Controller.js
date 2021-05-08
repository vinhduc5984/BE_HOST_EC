const controller = require('./index');
const customerService = require('../services/customer.Service');

const signup = async (req, res, next) => {
  console.log('Signup');
  console.log('Body', req.body);

  const resService = await customerService.SignupService(req.body);
  if (resService.statusCode === 200 || resService.statusCode === 201)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const vetifyCustomer = async (req, res, next) => {
  const tokenG = req.value.body.token.data;
  console.log('log g', tokenG);
  const resService = await customerService.VetifyService({
    tokenG,
    ...req.body,
  });
  console.log(resService);
  if (resService.statusCode === 200)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

const signin = async (req, res, next) => {
  const resService = await customerService.SigninService(req.body);
  if (resService.statusCode === 200)
    return controller.sendSuccess(
      res,
      resService.data,
      resService.statusCode,
      resService.msg,
    );
  return controller.sendSuccess(res, {}, resService.statusCode, resService.msg);
};

module.exports = { signup, signin, vetifyCustomer };
