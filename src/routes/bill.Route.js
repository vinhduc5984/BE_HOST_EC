const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const billController = require('../controllers/bill.Controller');

const validate = require('../middleware/validator/index');
const SchemaBill = require('../middleware/validator/bill.Validate');

router.post(
  '/CreateBill',
  jwt.verify,
  validate.validateBody(SchemaBill.createbill),
  billController.CreateBill,
);

router.post('/ChangeStatusBill', billController.ChangeStatusBill);

router.get('/FindBill', jwt.verify, billController.FindBillOfCustomer);

module.exports = router;
