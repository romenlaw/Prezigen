var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
var ctrlSuppliers = require('../controllers/suppliers');
var ctrlProducts = require('../controllers/products');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

// suppliers
router.get('/suppliers', ctrlSuppliers.suppliersSearch);
router.post('/suppliers', ctrlSuppliers.suppliersCreate);
router.get('/suppliers/:supplierid', ctrlSuppliers.suppliersReadOne);
router.put('/suppliers/:supplierid', ctrlSuppliers.suppliersUpdateOne);
router.delete('/suppliers/:supplierid', ctrlSuppliers.suppliersDeleteOne);


// products
router.get('/products', ctrlProducts.productsSearch);
//router.post('/products', auth, ctrlProducts.productsCreate);
router.post('/products', ctrlProducts.productsCreate);
router.get('/products/:productid', ctrlProducts.productsReadOne);
//router.put('/products/:productid', auth, ctrlProducts.productsUpdateOne);
//router.delete('/products/:productid', auth, ctrlProducts.productsDeleteOne);
router.put('/products/:productid', ctrlProducts.productsUpdateOne);
router.delete('/products/:productid', ctrlProducts.productsDeleteOne);

// reviews
router.post('/products/:productid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/products/:productid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/products/:productid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
router.delete('/products/:productid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);

// users
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
