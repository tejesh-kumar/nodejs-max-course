const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;



// router.get('/products/:productId', shopController.getProducts);
// :productId - productId can be any dynamic content(: - tells that the part of route can be anything).
// This dynamic value can be extracted from url using that name 'productId'.

// In this case, 
// router.get('/products/delete', shopController.delete);
// router.get('/products/:productId', shopController.getProducts);
// order of the static route must be above dynamic route. Hence, only that specific route can be handled by static route and other routes by dynmic route.

// To access the productId from url,
//  const prodId = req.params.productId;