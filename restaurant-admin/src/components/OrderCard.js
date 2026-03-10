import { useEffect, useState } from "react"

export default function OrderCard({ order }) {

const [minutes,setMinutes] = useState(0)

useEffect(()=>{

const updateTimer = () => {

const start = new Date(order.createdAt)
const now = new Date()

const diff = Math.floor((now - start) / 60000)

setMinutes(diff)

}

updateTimer()

const interval = setInterval(updateTimer,1000)

return () => clearInterval(interval)

},[order])

let statusClass = "processing"

if(order.status === "served") statusClass = "done"
if(order.orderType === "takeaway") statusClass = "takeaway"

const placedTime = new Date(order.createdAt).toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
})

const itemCount = order.items.length

/* TOTAL PREPARATION TIME */

let totalPrep = 0

order.items.forEach(i=>{
totalPrep += i.itemId?.averagePreparationTime || 0
})

/* ONGOING TIME */

const ongoing = Math.min(minutes,totalPrep)

return(

<div className={`orderCard ${statusClass}`}>

<div className="orderHeaderBox">

<div className="headerLeft">

<div className="orderNumberRow">

<img src="/icons/fork.png" className="forkIcon"/>

<span className="orderNumber">
# {order.orderNumber || order._id.slice(-3)}
</span>

</div>

<div className="headerMeta">

<p>Table-{order.tableId?.tableNumber || "-"}</p>

<p>{placedTime}</p>

</div>

<p className="itemCount">{itemCount} Item</p>

</div>

<div className={`statusPill ${statusClass}`}>

<p className="statusTitle">
{order.orderType === "dinein" ? "Dine In" : "Take Away"}
</p>

{order.status === "processing" && (

<p className="statusSub">
Ongoing: {ongoing} / {totalPrep} Min
</p>

)}

{order.status === "served" && (

<p className="statusSub">
Served
</p>

)}

</div>

</div>

<div className="orderItems">

{order.items.map((item,i)=>(

<div className="itemRow" key={i}>
1 x {item.itemId?.name}
</div>

))}

</div>

<div className="orderFooter">

{order.status === "processing" && (

<button className="processingBtn">

Processing

<img src="/icons/time.png" className="btnIcon"/>

</button>

)}

{order.status === "served" && (

<button className="doneBtn">

Order Done

<img src="/icons/tick.png" className="btnIcon"/>

</button>

)}

</div>

</div>

)

}