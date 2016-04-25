var mongoose=require('mongoose');
var Prod = mongoose.model('Product');

var sendJsonResponse=function(res, status, content) {
	res.status(status);
	res.json(content);
}

var doAddReview = function(req, res, product) {
	if(!product) {
		sendJsonResponse(res, 404, {
			message : "productid not found"
		});
	} else {
		product.reviews.push({
			userName: req.body.userName,
			rating: req.body.rating,
			comment: req.body.comment
		});
		product.save(function(err, product){
			var thisReview;
			if(err) {
				sendJsonResponse(res, 400, err);
			} else{
				thisReview=product.reviews[product.reviews.length-1];
				sendJsonResponse(res, 201, thisReview);
			}
		});
	}
};

module.exports.reviewsCreate=function(req, res) {
	var productid=req.params.productid;
	if(productid) {
		Prod.findById(productid)
		.select('reviews')
		.exec(function(err, product){
			if(err) {
				sendJsonResponse(res, 400, err);
			} else {
				doAddReview(req, res, product);
			}
		});
	} else {
		sendJsonResponse(res, 404, {
			message : "Not found, productid parameter required"
		});
	}
};
module.exports.reviewsReadOne=function(req, res) {};
module.exports.reviewsUpdateOne=function(req, res) {};
module.exports.reviewsDeleteOne=function(req, res) {
	if(!req.params.productid || !req.params.reviewid) {
		sendJsonResponse(res, 404, {
			message : "Not found, productid and reviewid are both required"
		});
		return;
	}
	Prod.findById(req.params.productid)
	.select('reviews')
	exec(function(err, product) {
		if(!product) {
			sendJsonResponse(res, 404, {
				message : "productid not found"
			});
			return;
		} else if(err) {
			sendJsonResponse(res, 400, err);
			return;
		}
		if(product.reviews && product.reviews.length>0) {
			if(!product.reviews.id(req.params.reviewid)) {
				sendJsonResponse(res, 404,  {
					message : "reviewid not found"
				});
			} else {
				product.reviews.id(req.params.reviewid).remove();
				product.save(function(err) {
					if(err) {
						sendJsonResponse(res, 404, err);
					} else {
						sendJsonResponse(res, 204, null);
					}
				});
			}
		} else {
			sendJsonResponse(res, 404, {
				message : 'No review to delete'
			});
		}
	});
};

