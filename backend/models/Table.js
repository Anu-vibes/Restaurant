const mongoose = require("mongoose")

const TableSchema = new mongoose.Schema({
    tableNumber: Number,
    name: {
        type: String,
        default: "Table"
    },
    capacity: Number,
    occupied: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Table", TableSchema)