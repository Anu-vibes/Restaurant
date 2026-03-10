const Order = require("../models/Order")
const Table = require("../models/Table")

function scheduleServe(order, prepTime){

setTimeout(async()=>{

order.status = "served"

await order.save()

const table = await Table.findById(order.tableId)

if(table){

table.occupied = false

await table.save()

}

}, prepTime * 60000)

}

module.exports = scheduleServe