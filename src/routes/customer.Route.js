const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const customController = require('../controllers/customer.Controller');

const validate = require('../middleware/validator/index');
const SchemaCustomer = require('../middleware/validator/customer.Validate');

router.post(
  '/signup',
  validate.validateBody(SchemaCustomer.signup),
  customController.signup,
);
router.post(
  '/signin',
  validate.validateBody(SchemaCustomer.signin),
  customController.signin,
);
router.post('/vetify', jwt.verify, customController.vetifyCustomer);

router.post(
  '/forget',
  validate.validateBody(SchemaCustomer.forgetpassword),
  customController.forgetPassword,
);
router.post(
  '/changepassword',
  validate.validateBody(SchemaCustomer.changepassword),
  jwt.verify,
  customController.changepassword,
);

router.get('/getUser', jwt.verify, customController.getDataUSer);

router.post(
  '/updateCustomer',
  jwt.verify,
  validate.validateBody(SchemaCustomer.updatecustomer),
  customController.updateDataCustomer,
);

router.post('/createFeedBack', customController.createfeedback);

router.post('/deleteFeedBack', customController.deletefeedback);

module.exports = router;
