var request=require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
if(process.env.NODE_ENV==='production') {
	apiOptions.server = "https://young-lowlands-74303.herokuapp.com";
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};


var products=[
	{
		name : 'Personalised Chocolate',
		sku : 'sji0934827',
		price : '$16.50',
		orderUrl : 'http://google.com',
		photos : [
			{ url : '/images/sample_product.jpg', description : 'dark chocolate'},
			{ url : '/images/sample_product2.jpg', description: 'white chocolate' }, 
			{ url : '/images/sample_product3.jpg' }],
		description : "Personalised Chocolate box is included in our catalog because it's a nice little gift and flexible enough to give to anyone. If you have tried it and like it - or if you don't - please leave a review to help other people just like you.",
		tags : ['food & drink'],
		displayedProperties : [
			{ sortOrder: 1, property : { name: "What\'s in the box?", value: "20 pieces of Belgian dark or white chocolate with letters arranged into your personalised message to that special someone."}},
			{ sortOrder: 3, property : { name: "Weight: ", value : "120g"}},
			{ sortOrder: 2, property : { name: "Dimension (L x W x H): ", value: "30cm x 20cm x 1.5cm"}}
		],
		selectableProperties : [
			{ property: {name: "Color", value : ["Dark", "White"]}, sortOrder: 2},
			{ property : {name: "Personalised Message", value : ""}, sortOrder: 1}
			
		],
		reviews : [
			{
				userName : 'joe1983',
				date : '12 March 2016',
				comment : "What a treat! It's really a great gift for anyone.",
				rating : 5
			},
			{
				userName : 'romen',
				date : '18 March 2016',
				comment : "Looks great and taste great. The only draw back is the extra calories.",
				rating : 4
			},
			{
				userName : 'chris938',
				date : '20 March 2016',
				comment : "My chocolate melted.",
				rating : 3
			}
		]
	},
	{
		name : 'A Plot of Land on the Moon',
		sku : 'ieu8736112',
		price : '$59.95',
		orderUrl : 'https://www.google.com.au/?gws_rd=ssl#q=javascript+json+print+name',
		photos : [
			{ url : 'http://en.es-static.us/upl/2012/09/moon_8-31-2012_Priya_Kumar_Muscat_Masqat_Oman.jpeg'}
		],
		description : "Own your own block of land on the moon and have an official certificate to prove it!",
		tags : ['space'],
		displayedProperties : [
			{ sortOrder: 1, property: {name: "Size", value : "1x1 sqm block on the moon"}}
		],
		selectableProperties : [
			{ sortOrder:1, property: {name: "Name of land title", value : ""}}
		]
	}
];

var renderProductList = function (req, res){ //, responseBody){
    /*
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No matching products found";
    }
  }
     */
  res.render('products-list', {
    title: 'Prezigen - perfect gift',
    pageHeader: {
      title: 'Prezigen',
      strapline: 'Find that perfect gift for the special someone...'
    },
    sidebar: "Looking for perfect gift ideas for someone special? Prezigen is a one-stop shop solution designed to build a character profile for the gift receiver and generate specialized tailored gifts for purchase all from the one convenient location.",
    //products: responseBody,
    //message: message
  });
};


/* GET home/product list page */
module.exports.productList = function (req, res) {
    /*
	var requestOptions, path;
  	path = '/api/products';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {}
	};
  	request(
    	requestOptions,
    	function(err, response, body) {
    		//console.log("body:"+body);
      		var data = body;
      		renderHomepage(req, res, data);
    	}
  	);*/
    renderProductList(req, res);
}

var renderProductPage=function(req, res, responseBody) {
	//console.log("product="+JSON.stringify(responseBody[0]));
	var message, product;
	if(!responseBody) {
		message="Cannot find productid";
	} else {
		product=responseBody;
	}

    res.render('product-info', { title: product.name,
    	pageHeader : {
    		title: product.name
    	},
    	message: message,
    	product
    });
}
/* GET product info page */
module.exports.productInfo = function (req, res) {
	//console.log("productInfo: params="+req.query.id);
	var requestOptions, path;
  	path = '/api/products/'+req.params.productid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			console.log("body="+body);
			renderProductPage(req, res, body);
		}
	);
}
module.exports.productInfoMockup=function(req, res) {
	renderProductPage(req, res, products[0]);
}
/* GET add review page */
module.exports.addReview = function (req, res) {
    res.render('product-review-form', { title: 'Add Review' });
}