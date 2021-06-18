const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');

const PaymentController = require('../controllers/Payment.Controller');

router.post('/PaymentPaypal', jwt.verify, PaymentController.Payment);
router.get('/cancel', (req, res) => res.send('Cancelled'));
router.get('/paySuccess', PaymentController.PaymentSuccess);

module.exports = router;
