const mongoose = require("mongoose")

var ToySchema = new mongoose.Schema({
    name: String,
    price: String,
    made: String,
    image: String,
    dob: Date,
    des: String,
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var ToyModel = mongoose.model('Toy', ToySchema, 'toy')






module.exports = ToyModel