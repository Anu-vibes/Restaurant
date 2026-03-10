const express = require("express")
const router = express.Router()

const {
    createTable,
    deleteTable,
    getTables
} = require("../controllers/tableController")

router.post("/create", createTable)
router.delete("/:id", deleteTable)
router.get("/", getTables)

module.exports = router