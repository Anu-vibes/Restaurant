const Order = require("../models/Order")
const Chef = require("../models/Chef")

exports.getAnalytics = async (req,res)=>{

const orders=await Order.find()
const chefs=await Chef.find()

const ordersCount=orders.length

const served=orders.filter(o=>o.status==="served").length
const takeaway=orders.filter(o=>o.orderType==="takeaway").length
const dinein=orders.filter(o=>o.orderType==="dinein").length

const revenue=orders.reduce((sum,o)=>sum+(o.totalPrice||0),0)

const chefStats=chefs.map(c=>({
_id:c._id,
name:c.name,
orders:orders.filter(o=>String(o.chefId)===String(c._id)).length
}))

const revenueAgg = await Order.aggregate([
    {
    $match:{
    status:"served",
    createdAt:{$gte:startDate}
    }
    },
    {
    $group:{
    _id:{
    $dateToString:{format:"%Y-%m-%d",date:"$createdAt"}
    },
    total:{ $sum:"$totalPrice" }
    }
    }
    ])
    
    const revenueMap={}
    revenueAgg.forEach(r=>{
    revenueMap[r._id]=r.total
    })
    
    const revenueLabels=[]
    const revenueSeries=[]
    
    for(let i=6;i>=0;i--){
    const d=new Date()
    d.setDate(d.getDate()-i)
    
    const label=d.toISOString().slice(0,10)
    
    revenueLabels.push(label)
    revenueSeries.push(revenueMap[label]||0)
    }
    
res.json({
chefs:chefs.length,
orders:ordersCount,
clients:ordersCount,
revenue,
dinein,
takeaway,
served,
chefStats,
revenueSeries,
revenueLabels
})

}
