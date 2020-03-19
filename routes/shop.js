const express = require('express');
const router = express.Router();

const ShopController = require('../controllers/shop.controller');

// @route /api/v1/shop/cart/:userId
router.get('/cart/:userId', ShopController.getCart);
router.post('/cart', ShopController.postCart);
router.delete('/cart', ShopController.deleteCartItem);

router.get('/orders', ShopController.getOrder);
router.post('/create-order', ShopController.postOrder);

module.exports = router;