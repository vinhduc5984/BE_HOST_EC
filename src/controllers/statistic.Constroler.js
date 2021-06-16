const controller = require('./index');
const StatisticService = require('../services/statistic.Service');

const revenuestatistic = async (req, res, next) => {
  const ResService = await StatisticService.RevenueStatistic(req.body);
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

module.exports = { revenuestatistic };
