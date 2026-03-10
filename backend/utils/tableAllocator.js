const Table = require("../models/Table")

async function allocateTable(persons){

const tables = await Table.find({ occupied:false }).sort({ capacity:1 })

for(let t of tables){

if(t.capacity >= persons){

t.occupied = true
await t.save()

return t

}

}

return null

}

module.exports = allocateTable