const express = require('express');
const router = express.Router();

const servicepackageController = require('../controllers/servicepackage.Controller');

router.post('/createServicePack', servicepackageController.creatpackage);
router.get('/getServicePack', servicepackageController.getpackage);
router.post('/editServicePack', servicepackageController.editpackage);
router.post('/deleteServicePack', servicepackageController.deletepackage);
router.post('/checkServicePack', servicepackageController.checkpackage);
router.post('/registerServicePack', servicepackageController.registerpackage);

module.exports = router;
