const express = require('express');
const router = express.Router();

const customController = require('../controllers/customer.Controller');

router.post('/signup', customController.signup);
router.post('/signin', customController.signin);

module.exports = router;
