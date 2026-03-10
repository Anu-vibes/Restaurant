const express = require("express")
const router = express.Router()

const Order = require("../models/Order")
const MenuItem = require("../models/MenuItem")

const allocateTable = require("../utils/tableAllocator")
const {getNextChef} = require("../utils/chefQueue")
const scheduleServe = require("../utils/orderTimer")

router.post("/create", async (req,res)=>{

    try{
    
    const {
    customerName,
    phone,
    address,
    persons,
    orderType,
    instructions,
    items
    }=req.body
    
    if(!items || items.length===0){
    return res.status(400).json({error:"No items"})
    }
    
    let table=null
    
    if(orderType==="dinein"){
    
    table=await allocateTable(persons)
    
    if(!table){
    return res.status(400).json({error:"No table available"})
    }
    
    }
    
    const chef=await getNextChef()
    
    let total=0
    let maxPrep=0
    
    for(const i of items){
    
    const menu=await MenuItem.findById(i.itemId)
    
    if(!menu) continue
    
    total+=menu.price*i.qty
    
    if(menu.averagePreparationTime>maxPrep){
    maxPrep=menu.averagePreparationTime
    }
    
    }
    
    const order=await Order.create({
    
    customerName,
    phone,
    address,
    persons,
    orderType,
    instructions,
    
    tableId:table?table._id:null,
    chef:chef._id,
    
    items,
    
    totalPrice:total
    
    })
    
    scheduleServe(order,maxPrep)
    
    res.json(order)
    
    }catch(err){
    
    console.log(err)
    
    res.status(400).json({error:err.message})
    
    }
    
})

router.get("/", async (req,res)=>{

const orders = await Order.find()
.populate("tableId")
.populate("chef")
.populate("items.itemId")

res.json(orders)

})

module.exports = router