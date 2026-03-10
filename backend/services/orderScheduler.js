const Order = require("../models/Order")
const Table = require("../models/Table")
const MenuItem = require("../models/MenuItem")

async function scheduleOrder(order,req){

let maxPrep=0

for(let item of order.items){

const menu=await MenuItem.findById(item.itemId)

if(menu.averagePreparationTime>maxPrep){

maxPrep=menu.averagePreparationTime

}

}

setTimeout(async()=>{

order.status="served"

await order.save()

if(order.tableId){

const table=await Table.findById(order.tableId)

table.occupied=false

await table.save()

}

const io=req.app.get("io")

io.emit("orderUpdate")
io.emit("tableUpdate")

},maxPrep*60000)

}

module.exports=scheduleOrder