const express = require('express');
const router = express.Router();

const customer = require('./customer.Route');
const user = require('./user.Route');
const company = require('./company.Route');
const bill = require('./bill.Route');
const freightcost = require('./freightcost.Route');
const financial = require('./financial.Route');
const promotion = require('./promotion.Route');
const payment = require('./Payment.Route');
const servicepackage = require('./servicepackage.Route');
const statistic = require('./statistic.Route');

router.use('/auth', customer);
router.use('/user', user);
router.use('/company', company);
router.use('/bill', bill);

router.use('/', freightcost);

router.use('/accouting', financial);

router.use('/revenue', financial);

router.use('/', promotion);
router.use('/payment', payment);

router.use('/', servicepackage);

router.use('/', statistic);

module.exports = router;
