const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/promotion.Controller');

router.post('/createPromotion', promotionController.createpromotion);
router.post('/getPromotion', promotionController.getpromotion);
router.post('/editPromotion', promotionController.editpromotion);
router.post('/deletePromotion', promotionController.deletepromotion);
router.post('/deleteOnePromotion', promotionController.deleteonepromotion);

module.exports = router;
