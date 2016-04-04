/* GET home/product list page */
module.exports.homeList = function (req, res) {
    res.render('products-list', { title: 'Home' });
}
/* GET product info page */
module.exports.productInfo = function (req, res) {
    res.render('product-info', { title: 'Product Info' });
}
/* GET add review page */
module.exports.addReview = function (req, res) {
    res.render('product-review-form', { title: 'Add Review' });
}