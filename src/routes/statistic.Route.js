const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const statisticController = require('../controllers/statistic.Constroler');

router.post('/revenue', statisticController.revenuestatistic);

module.exports = router;
