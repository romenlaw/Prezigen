var mongoose = require('mongoose');

module.exports.addressSchema = mongoose.Schema({
    label: String,
    line1: {
        type: String, 
        required: true
    },
    line2: String, 
    suburb: {
        type: String, 
        required: true 
    },
    state: {
        type: String, 
        required: true 
    },
    postcode: {
        type: String, 
        required: true 
    }, 
    country: {
        type: String ,
        default: "Australia"
    }
}, { _id: false});

module.exports.contactSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String, 
        required: true
    },
    phoneNumber: String,
    mobileNumber: String,
    email: String,
    remarks: String
}, {_id: false});