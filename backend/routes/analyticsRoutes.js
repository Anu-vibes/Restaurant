// const express = require("express")
// const router = express.Router()

// const Order = require("../models/Order")
// const Chef = require("../models/Chef")

// router.get("/", async (req, res) => {

// try{

// const {range="daily"} = req.query

// let startDate = new Date()

// if(range==="daily"){
// startDate.setHours(0,0,0,0)
// }

// if(range==="weekly"){
// startDate.setDate(startDate.getDate()-7)
// }

// if(range==="monthly"){
// startDate.setMonth(startDate.getMonth()-1)
// }

// if(range==="yearly"){
// startDate.setFullYear(startDate.getFullYear()-1)
// }

// const chefs = await Chef.countDocuments()

// const orders = await Order.countDocuments({
// createdAt:{$gte:startDate}
// })

// const dinein = await Order.countDocuments({
// orderType:"dinein",
// createdAt:{$gte:startDate}
// })

// const takeaway = await Order.countDocuments({
// orderType:"takeaway",
// createdAt:{$gte:startDate}
// })

// const served = await Order.countDocuments({
// status:"served",
// createdAt:{$gte:startDate}
// })

// const revenueAgg = await Order.aggregate([
// {
// $match:{
// status:"served",
// createdAt:{$gte:startDate}
// }
// },
// {
// $group:{
// _id:null,
// total:{$sum:"$totalPrice"}
// }
// }
// ])

// const revenue = revenueAgg.length ? revenueAgg[0].total : 0

// const uniqueClients = await Order.aggregate([
// {
// $group:{
// _id:"$phone"
// }
// }
// ])

// const clients = uniqueClients.length

// const chefStats = await Order.aggregate([
// {
// $group:{
// _id:"$chef",
// orders:{ $sum:1 }
// }
// },
// {
// $lookup:{
// from:"chefs",
// localField:"_id",
// foreignField:"_id",
// as:"chef"
// }
// },
// {$unwind:"$chef"},
// {
// $project:{
// name:"$chef.name",
// orders:1
// }
// }
// ])

// res.json({
// chefs,
// orders,
// clients,
// revenue,
// dinein,
// takeaway,
// served,
// chefStats
// })

// }catch(err){

// res.status(500).json({error:err.message})

// }

// })

// module.exports = router
const express = require("express")
const router = express.Router()

const Order = require("../models/Order")
const Chef = require("../models/Chef")

router.get("/", async (req, res) => {

try{

const {range="daily"} = req.query

let startDate = new Date()

if(range==="daily"){
startDate.setHours(0,0,0,0)
}

if(range==="weekly"){
startDate.setDate(startDate.getDate()-7)
}

if(range==="monthly"){
startDate.setMonth(startDate.getMonth()-1)
}

if(range==="yearly"){
startDate.setFullYear(startDate.getFullYear()-1)
}

const chefs = await Chef.countDocuments()

const orders = await Order.countDocuments({
createdAt:{$gte:startDate}
})

const dinein = await Order.countDocuments({
orderType:"dinein",
createdAt:{$gte:startDate}
})

const takeaway = await Order.countDocuments({
orderType:"takeaway",
createdAt:{$gte:startDate}
})

const served = await Order.countDocuments({
status:"served",
createdAt:{$gte:startDate}
})

const revenueAggTotal = await Order.aggregate([
{
$match:{
status:"served",
createdAt:{$gte:startDate}
}
},
{
$group:{
_id:null,
total:{$sum:"$totalPrice"}
}
}
])

const revenue = revenueAggTotal.length ? revenueAggTotal[0].total : 0

const revenueAgg = await Order.aggregate([
{
$match:{
status:"served",
createdAt:{$gte:startDate}
}
},
{
$group:{
_id:{
$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}
},
total:{ $sum:"$totalPrice" }
}
},
{ $sort:{_id:1} }
])

const revenueLabels = revenueAgg.map(r=>r._id)
const revenueSeries = revenueAgg.map(r=>r.total)

const uniqueClients = await Order.aggregate([
{
$group:{
_id:"$phone"
}
}
])

const clients = uniqueClients.length

const chefStats = await Order.aggregate([
{
$group:{
_id:"$chef",
orders:{ $sum:1 }
}
},
{
$lookup:{
from:"chefs",
localField:"_id",
foreignField:"_id",
as:"chef"
}
},
{$unwind:"$chef"},
{
$project:{
name:"$chef.name",
orders:1
}
}
])

res.json({
chefs,
orders,
clients,
revenue,
dinein,
takeaway,
served,
chefStats,
revenueSeries,
revenueLabels
})

}catch(err){

res.status(500).json({error:err.message})

}

})

module.exports = router
