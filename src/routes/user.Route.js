const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.Controller');

router.get('/get-profile', userController.getProfile);

module.exports = router;
