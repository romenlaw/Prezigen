var mongoose = require('mongoose');
var common = require('./common.js');
var addressSchema = common.addressSchema;
var contactSchema = common.contactSchema;

var supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abn: String,
    status: {
        type: String,
        required: true
    },
    description: String,
    email: {
        type: String
    },
    addresses: [addressSchema],
    contacts: [contactSchema],
    tags: {
        type: [String],
        required: true
    }
});

mongoose.model('Supplier', supplierSchema);