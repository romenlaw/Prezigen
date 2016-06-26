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
    console.log("api create:" + req.body.product);
    Prod.create(req.body.product, function (err, product) {
        console.log("api create:", err, product);
        if (err) {
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
        var p = req.body.product;
        product.name = p.name;
        product.supplierId = p.supplierId;
        product.supplierName = p.supplierName;
        product.status = p.status;
        product.sku = p.sku;
        product.price = p.price;
        product.orderUrl = p.orderUrl;
        product.description = p.description;
        product.tags = p.tags;
        product.displayedProperties = p.displayedProperties;
        product.selectableProperties = p.selectableProperties;

		product.save(function(err, product){
			if(err) {
				sendJsonResponse(res, 404, err);
			} else {
				sendJsonResponse(res, 200, product);
			}
		});
	});
};

module.exports.productsDeleteOne = function (req, res) {
    var productid = req.params.productid;
    if (productid) {
        Prod.findByIdAndRemove(productid)
		.exec(function (err, product) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            res.setHeader("productid", productid);
            sendJsonResponse(res, 204, null);
        });
    } else {
        sendJsonResponse(res, 404, {
            message : "No productid"
        });
    }
};