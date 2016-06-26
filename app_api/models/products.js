var mongoose=require('mongoose');

var photoSchema=new mongoose.Schema({
	url: {
		type:String,
		required:true,
		default: "http://placehold.it/140x100"
	},
	description:String
}, {_id:false});

var propertySchema=new mongoose.Schema({
	sortOrder: Number,
	property: {
		name: String,
		value: mongoose.Schema.Types.Mixed
	}
}, {_id:false});

var reviewSchema=new mongoose.Schema({
	userName: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: String,
    date: {
        type: Date,
        "default": Date.now
    } 
});

var productSchema = new mongoose.Schema({
	supplierId: {
		type: String,
		required: true
    },
    supplierName: {
        type: String,
        required: true
    },
	name: {
		type: String,
		required: true
    },
    status: {
        type: String,
        required: true
    },
	sku: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		default: 1.95
	},
	orderUrl: {
		type: String,
		required: true
	},
	photos: {
		type: [photoSchema],
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		required: true
	},
	displayedProperties: [propertySchema],
	selectableProperties: [propertySchema],
	reviews: [reviewSchema]
});

mongoose.model('Product', productSchema);