const controller = require('./index');
const CaulatorService = require('../services/Caculator.Service');

const Caculator = async (req, res, next) => {
  const ResService = await CaulatorService.Caculator(req.body);
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

module.exports = { Caculator };
