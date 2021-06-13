const controller = require('./index');
const PromotionService = require('../services/promotion.Service');

const createpromotion = async (req, res, next) => {
  const resService = await PromotionService.creatPromotion(req.body);
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

const getpromotion = async (req, res, next) => {
  const resService = await PromotionService.getPromotion(req.body);
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

const editpromotion = async (req, res, next) => {
  const resService = await PromotionService.editPromotion(req.body);
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

const deletepromotion = async (req, res, next) => {
  const resService = await PromotionService.deletePromotion(req.body);
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

const deleteonepromotion = async (req, res, next) => {
  const resService = await PromotionService.deleteOnePomotion(req.body);
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
  createpromotion,
  getpromotion,
  editpromotion,
  deletepromotion,
  deleteonepromotion,
};
