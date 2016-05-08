var express = require('express');
var router = express.Router();
var ctrlProducts = require('../controllers/products');
var ctrlOthers = require('../controllers/others');

/* GET product related pages. */
router.get('/', ctrlOthers.home);
router.get('/products', ctrlProducts.productList);
router.get('/product', ctrlProducts.productInfoMockup);
router.get('/product/:productid', ctrlProducts.productInfo);
router.get('/product/review/new', ctrlProducts.addReview);

/* GET Others pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
