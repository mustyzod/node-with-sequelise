const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controllers');

//@route GET /api/v1/products
router.get('/', productController.getProducts);
//@route GET /api/v1/product/:id
router.get('/:id', productController.getSingleProduct);
// @route POST /api/v1/products/add
router.post('/add', productController.addProduct);
// @route PUT /api/v1/products/:id
router.put('/:id', productController.updateProduct);
// @route DELETE /api/v1/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;