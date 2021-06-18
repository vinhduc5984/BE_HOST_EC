const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const statisticController = require('../controllers/statistic.Constroler');

router.post('/revenue', statisticController.revenuestatistic);
router.get(
  '/invoiceStatisticChoXacNhan',
  jwt.verify,
  statisticController.invoiceStatisticChoXacNhan,
);
router.get(
  '/invoiceStatisticDangGiao',
  jwt.verify,
  statisticController.invoiceStatisticDangGiao,
);
router.get(
  '/invoiceStatisticDaGiao',
  jwt.verify,
  statisticController.invoiceStatisticDaGiao,
);
router.get(
  '/invoiceStatisticDaHuy',
  jwt.verify,
  statisticController.invoiceStatisticDaHuy,
);

module.exports = router;
