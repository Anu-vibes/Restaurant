const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

customerName:String,

phone:String,

address:String,

persons:Number,

orderType:String,

instructions:String,

tableId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Table"
},

chef:{
type:mongoose.Schema.Types.ObjectId,
ref:"Chef"
},

items:[
{
itemId:{
type:mongoose.Schema.Types.ObjectId,
ref:"MenuItem"
},
qty:Number
}
],

status:{
type:String,
default:"processing"
},

totalPrice:Number,

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Order",orderSchema)