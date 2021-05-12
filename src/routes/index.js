const express = require('express');
const router = express.Router();

const customer = require('./customer.Route');
const user = require('./user.Route');
const company = require('./company.Route');

router.use('/auth', customer);

router.use('/user', user);
router.use('/company', company);
router.get('/ken', (req, res, next) => {
  res.json({
    name: 'Lam Hoang An',
    age: '20',
    hoby: '123',
  });
});

module.exports = router;
