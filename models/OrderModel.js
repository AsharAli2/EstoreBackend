const mongoose = require("mongoose")
const orderschema = mongoose.Schema({
    products: Array,

    userName: String,

})


const OrderModel = mongoose.model("Order", orderschema)

module.exports = { OrderModel }