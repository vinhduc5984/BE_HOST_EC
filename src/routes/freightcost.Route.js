const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const freightcostController = require('../controllers/freightcost.Constroler');

router.post('/caculatorCost', freightcostController.caculatorcost);

module.exports = router;
