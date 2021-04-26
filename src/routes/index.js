const express = require('express');
const router = express.Router();

const customer = require('./customer.Route');

router.use('/auth', customer);

module.exports = router;
