var mongoose=require('mongoose');
var Prod = mongoose.model('Product');

var sendJsonResponse=function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.productsSearch=function(req, res) {
	Prod.find()
	.exec(function(err, products) {
		sendJsonResponse(res, 200, products);
	}) ;
};
module.exports.productsCreate=function(req, res) {
	Prod.create({
		vendorCode: req.body.vendorCode,
		name : req.body.name,
		sku : req.body.sku,
		price : req.body.price,
		orderUrl : req.body.orderUrl,
		photos : [
			{ url : req.body.photoUrl}
		],
		description : req.body.description,
		tags : [req.body.tag],
		displayedProperties : [
			{ sortOrder: 1, property: {name: "Size", value : "1x1 sqm block on the moon"}}
		],
		selectableProperties : [
			{ sortOrder:1, property: {name: "Name of land title", value : ""}}
		]
	}, function(err, product) {
		if(err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, product);
		}
	});
};
module.exports.productsReadOne=function(req, res) {
	Prod.findById(req.params.productid)
	.exec(function(err, product) {
		sendJsonResponse(res, 200, product);
	});
	
};
module.exports.productsUpdateOne=function(req, res) {
	if(!req.params.productid) {
		sendJsonResponse(res, 404, {
			"message" : "Not found, productid is required"
		});
		return;
	}
	Prod.findById(req.params.productid)
	.select('-reviews')
	.exec(function(err, product)
	 {
	 	if(!product) {
	 		sendJsonResponse(res, 404, {
	 			"message": "productid not found"
	 		});
	 		return;
	 	} else if(err) {
	 		sendJsonResponse(res, 400, err);
	 		return;
	 	}
		product.name=req.body.name;
		product.save(function(err, product){
			if(err) {
				sendJsonResponse(res, 404, err);
			} else {
				sendJsonResponse(res, 200, product);
			}
		});
	});
};
module.exports.productsDeleteOne=function(req, res) {
	var productid=req.params.productid;
	if(productid) {
		Prod.findByIdAndRemove(productid)
		.exec(function(err, product) {
			if(err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 204, null);
		});
	} else {
		sendJsonResponse(res, 404, {
			message : "No productid"
		});
	}
};
