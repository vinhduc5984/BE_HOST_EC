const express = require('express');
const router = express.Router();

const customer = require('./customer.Route');
const user = require('./user.Route');
const company = require('./company.Route');
const bill = require('./bill.Route');
const payment = require('./Payment.Route');

router.use('/auth', customer);
router.use('/user', user);
router.use('/company', company);
router.use('/bill', bill);

router.use('/payment', payment);

module.exports = router;
