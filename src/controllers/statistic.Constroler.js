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

const invoiceStatisticChoXacNhan = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const ResService = await StatisticService.InvoiceStatisticChoXacNhan(tokenID);
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

const invoiceStatisticDangGiao = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const ResService = await StatisticService.InvoiceStatisticDangGiao(tokenID);
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

const invoiceStatisticDaGiao = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const ResService = await StatisticService.InvoiceStatisticDaGiao(tokenID);
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

const invoiceStatisticDaHuy = async (req, res, next) => {
  const tokenID = req.value.body.token.data;
  const ResService = await StatisticService.InvoiceStatisticDaHuy(tokenID);
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
  revenuestatistic,
  invoiceStatisticChoXacNhan,
  invoiceStatisticDangGiao,
  invoiceStatisticDaGiao,
  invoiceStatisticDaHuy,
};
