const controller = require('./index');
const FreightCostService = require('../services/freightcost.Service');

const caculatorcost = async (req, res, next) => {
  const ResService = await FreightCostService.caculatorCost(req.body);
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

module.exports = { caculatorcost };
