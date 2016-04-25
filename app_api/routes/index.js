var express = require('express');
var router = express.Router();
var ctrlProducts = require('../controllers/products');
var ctrlReviews = require('../controllers/reviews');

// products
router.get('/products', ctrlProducts.productsSearch);
router.post('/products', ctrlProducts.productsCreate);
router.get('/products/:productid', ctrlProducts.productsReadOne);
router.put('/products/:productid', ctrlProducts.productsUpdateOne);
router.delete('/products/:productid', ctrlProducts.productsDeleteOne);

// reviews
router.post('/products/:productid/reviews', ctrlReviews.reviewsCreate);
router.get('/products/:productid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/products/:productid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/products/:productid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
