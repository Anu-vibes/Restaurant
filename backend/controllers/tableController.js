const Table = require("../models/Table")
const renumberTables = require("../utils/renumberTables")

exports.createTable = async (req, res) => {

    const { name, capacity } = req.body

    const count = await Table.countDocuments()

    const table = new Table({
        name: name || "Table",
        tableNumber: count + 1,
        capacity
    })

    await table.save()

    res.json(table)
}

exports.deleteTable = async (req, res) => {

    await Table.findByIdAndDelete(req.params.id)

    await renumberTables()

    res.json({ message: "deleted" })
}

exports.getTables = async (req, res) => {

    const tables = await Table.find().sort({ tableNumber: 1 })

    res.json(tables)
}