const Table = require("../models/Table")

async function allocateTable(persons) {

    const table = await Table.findOne({
        capacity: { $gte: persons },
        occupied: false
    }).sort({ capacity: 1 })

    if (!table) return null

    table.occupied = true
    await table.save()

    return table
}

module.exports = allocateTable