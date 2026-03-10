import {useEffect,useState} from "react"
import api from "../api/api"
import socket from "../sockets/socket"

import Sidebar from "../components/Sidebar"
import OrderCard from "../components/OrderCard"

import "../css/orders.css"

export default function OrderLine(){

const [orders,setOrders]=useState([])

const loadOrders=()=>{
api.get("/orders").then(res=>setOrders(res.data))
}

useEffect(()=>{

loadOrders()

socket.on("orderUpdate",()=>{
loadOrders()
})

},[])

return(

<div className="page">

<Sidebar/>

<div className="content">

<h1>Order Line</h1>

<div className="ordersGrid">

{orders.map(o=>(
<OrderCard key={o._id} order={o}/>
))}

</div>

</div>

</div>

)

}