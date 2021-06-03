const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const freightcostController = require('../controllers/freightcost.Constroler');

router.post('/FreightCost', freightcostController.freightcost);

module.exports = router;
