const express = require("express")
const router = express.Router()

const Chef = require("../models/Chef")

router.post("/create", async (req,res)=>{

const chef = await Chef.create(req.body)

res.json(chef)

})

router.get("/", async (req,res)=>{

const chefs = await Chef.find()

res.json(chefs)

})

module.exports = router