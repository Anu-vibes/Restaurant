const Table = require("../models/Table")

async function renumberTables() {

    const tables = await Table.find().sort({ tableNumber: 1 })

    for (let i = 0; i < tables.length; i++) {

        tables[i].tableNumber = i + 1
        await tables[i].save()
    }
}

module.exports = renumberTables