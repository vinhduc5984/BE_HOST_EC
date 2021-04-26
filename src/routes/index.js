const express = require('express');
const router = express.Router();

const customer = require('./customer.Route');
const user = require('./user.Route');

router.use('/auth', customer);
router.use('/user', user);

module.exports = router;
