const express = require("express")
const router = express.Router()

const MenuItem = require("../models/MenuItem")


router.post("/create", async (req,res)=>{

try{

const item = await MenuItem.create(req.body)

res.json(item)

}catch(err){

res.status(500).json({error:err.message})

}

})


router.get("/", async (req,res)=>{

    const {page=1,limit=6,category} = req.query
    
    let filter={}
    
    if(category){
    
    filter.category={
    $regex:`^${category}$`,
    $options:"i"
    }
    
    }
    
    const items=await MenuItem.find(filter)
    .skip((page-1)*limit)
    .limit(Number(limit))
    
    res.json(items)
    
})

module.exports = router