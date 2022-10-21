const mongoose = require("mongoose")

var CardSchema = new mongoose.Schema({
    name: String,
    price: String,
    made: String,
    image: String,
    dob: Date,
    des: String,
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var CardSchema = mongoose.model('Card', CardSchema, 'card')






module.exports = CardSchema