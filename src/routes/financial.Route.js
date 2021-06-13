const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const financialController = require('../controllers/financial.Constroler');

router.post('/createAccounting', financialController.createAccounting);
router.post('/getAccounting', financialController.getAccounting);
router.post('/deleteAccounting', financialController.deleteAccounting);
router.post('/createRevenue', financialController.createRevenue);
router.post('/getRevenue', financialController.getRevenue);
router.post('/deleteRevenue', financialController.deleteRevenue);

module.exports = router;
