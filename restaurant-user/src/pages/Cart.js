import {useContext,useState} from "react"
import {CartContext} from "../context/CartContext"
import api from "../api/api"
import {useNavigate} from "react-router-dom"
import SwipeOrder from "../components/SwipeOrder"

import "../css/cart.css"

export default function Cart(){

const {cart,addItem,decreaseItem}=useContext(CartContext)

const navigate=useNavigate()

const [orderType,setOrderType]=useState("dinein")
const [instructions,setInstructions]=useState("")
const [showPopup,setShowPopup]=useState(false)

const customer=JSON.parse(localStorage.getItem("customer"))

const itemTotal=cart.reduce((sum,i)=>sum+i.price*i.quantity,0)

const tax=itemTotal*0.05

const deliveryCharge=orderType==="takeaway"?30:0

const grandTotal=itemTotal+tax+deliveryCharge

const placeOrder=async()=>{

await api.post("/orders/create",{

customerName:customer.name,
phone:customer.contact,
address:customer.address,
persons:customer.persons,

orderType,

instructions,

items:cart.map(i=>({

itemId:i._id,
qty:i.quantity

}))

})

localStorage.removeItem("cart")

navigate("/success")

}

return(

<div className="cartPage">

<h2 className="cartTitle">Your Cart</h2>

<div className="cartItems">

{cart.map(i=>(

<div className="cartItem" key={i._id}>

<img
src={i.image || "/icons/food-placeholder.png"}
alt=""
/>

<div className="cartInfo">

<h4>{i.name}</h4>

<p className="price">₹ {i.price}</p>

<div className="qtyControls">

<button onClick={()=>decreaseItem(i._id)}>-</button>

<span>{i.quantity}</span>

<button onClick={()=>addItem(i)}>+</button>

</div>

</div>

</div>

))}

</div>

<div
className="instructionsBox"
onClick={()=>setShowPopup(true)}
>

Add cooking instructions (optional)

</div>

<div className="orderTypeToggle">

<button
className={orderType==="dinein"?"active":""}
onClick={()=>setOrderType("dinein")}

>

Dine In

</button>

<button
className={orderType==="takeaway"?"active":""}
onClick={()=>setOrderType("takeaway")}

>

Take Away

</button>

</div>

<div className="billSection">

<div className="billRow">

<span>Item Total</span> <span>₹ {itemTotal.toFixed(2)}</span>

</div>

<div className="billRow">

<span>Taxes (5%)</span> <span>₹ {tax.toFixed(2)}</span>

</div>

{orderType==="takeaway" && (

<div className="billRow">

<span>Delivery Charge</span> <span>₹ 30</span>

</div>

)}

<div className="billRow grand">

<span>Grand Total</span> <span>₹ {grandTotal.toFixed(2)}</span>

</div>

</div>
<div className="detailsSection">

<h3>Your details</h3>

<p className="customerName">

{customer.name}, {customer.contact}

</p>

</div>

{orderType==="takeaway" && (

<div className="deliveryInfo">

<div className="deliveryRow">

<img src="/icons/location.png" alt=""/>

<span>{customer.address}</span>

</div>

<div className="deliveryRow">

<img src="/icons/clock.png" alt=""/>

<span>Delivery in 30 mins</span>

</div>

</div>

)}

<SwipeOrder placeOrder={placeOrder}/>

{showPopup && (

<div className="popupOverlay">

<div className="popupBox">

<h3>Add Cooking instructions</h3>

<textarea

value={instructions}

onChange={e=>setInstructions(e.target.value)}

placeholder="Enter instructions"

/>

<div className="popupBtns">

<button
className="cancelBtn"
onClick={()=>setShowPopup(false)}
>

Cancel

</button>

<button
className="nextBtn"
onClick={()=>setShowPopup(false)}
>

Next

</button>

</div>

</div>

</div>

)}

</div>

)

}
