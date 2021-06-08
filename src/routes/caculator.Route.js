const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt.Service');
const caculatorController = require('../controllers/caculator.Constroler');

router.post('/Caculator', caculatorController.Caculator);

module.exports = router;
