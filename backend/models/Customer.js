const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({

    name: String,
    persons: Number,
    address: String,
    contact: String

})

module.exports = mongoose.model("Customer", CustomerSchema)