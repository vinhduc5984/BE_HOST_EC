const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company.Controller');
const validate = require('../middleware/validator/index');
const SchemaCompany = require('../middleware/validator/company.Validate');

router.post(
  '/signup',
  validate.validateBody(SchemaCompany.signup),
  companyController.signup,
);

router.post('/getDataCompany', companyController.getdatacom);
router.get('/getListCompanyToVerify', companyController.GetListDataToVerify);
router.post('/createCostSheet', companyController.createcostsheet);
router.post('/getDataCost', companyController.getdatacost);

module.exports = router;
