const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({

name:String,

description:String,

price:Number,

averagePreparationTime:Number,

category:String,

stock:Number,

image:String

})

module.exports = mongoose.model("MenuItem",menuItemSchema)