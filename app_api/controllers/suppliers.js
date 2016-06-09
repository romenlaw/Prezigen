var mongoose = require('mongoose');
var Supp = mongoose.model('Supplier');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.suppliersCreate = function (req, res) {
    //var sup = JSON.parse(req.body.supplierString);
    console.log("api create:" + req.body.supplier);
    Supp.create(req.body.supplier, function (err, supplier) {
        console.log("api create:", err, supplier);
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, supplier);
        }
    });
};
module.exports.suppliersSearch = function (req, res) {
    Supp.find()
	.exec(function (err, suppliers) {
        sendJsonResponse(res, 200, suppliers);
    });
};

module.exports.suppliersReadOne = function (req, res) {
    Supp.findById(req.params.supplierid)
	.exec(function (err, supplier) {
        sendJsonResponse(res, 200, supplier);
    });
	
};
module.exports.suppliersDeleteOne = function (req, res) {
    var supplierid = req.params.supplierid;
    if (supplierid) {
        Supp.findByIdAndRemove(supplierid)
		.exec(function (err, supplier) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            res.setHeader("supplierid", supplierid);
            sendJsonResponse(res, 204, null);
        });
    } else {
        sendJsonResponse(res, 404, {
            message : "No supplierid"
        });
    }
};
module.exports.suppliersUpdateOne = function (req, res) {
    if (!req.params.supplierid) {
        sendJsonResponse(res, 404, {
            "message" : "Not found, supplierid is required"
        });
        return;
    }
    Supp.findById(req.params.supplierid)
	.select()
	.exec(function (err, supplier) {
        if (!supplier) {
            sendJsonResponse(res, 404, {
                "message": "supplierid not found"
            });
            return;
        } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        supplier.name = req.body.name;
        supplier.save(function (err, product) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, product);
            }
        });
    });
};