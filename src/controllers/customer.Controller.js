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

const forgetPassword = async (req, res, next) => {
  const resService = await customerService.ForgetPasswordService(req.body);
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

const changepassword = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const resService = await customerService.ChangePasswordService(
    tokenID,
    req.body,
  );
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

const getDataUSer = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const resService = await customerService.getUserData({ id: tokenID });
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

const updateDataCustomer = async (req, res, next) => {
  // const TokenID = req.value.body.token?.data;
  const { token, ...data } = req.value.body;
  const resService = await customerService.UpdateDataCustomer(token.data, data);
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

const createfeedback = async (req, res, next) => {
  const ResService = await customerService.createFeedback(req.body);
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

const deletefeedback = async (req, res, next) => {
  const ResService = await customerService.deleteFeedback(req.body);
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
  signup,
  signin,
  vetifyCustomer,
  forgetPassword,
  changepassword,
  getDataUSer,
  updateDataCustomer,
  createfeedback,
  deletefeedback,
};
