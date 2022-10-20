const mongoose = require("mongoose")

var CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    dob: Date,
    gender: String,
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var CustomerModel = mongoose.model('Customer', CustomerSchema, 'customer')






module.exports = CustomerModel