import {useContext} from "react"
import {CartContext} from "../context/CartContext"

import "../css/menuItem.css"

export default function MenuItemCard({item}){

const {addItem,decreaseItem,getQuantity}=useContext(CartContext)

const quantity=getQuantity(item._id)

return(

<div className="foodCard">

<img
src={item.image || "/icons/food-placeholder.png"}
alt={item.name}
/>

<div className="overlay">

<div className="foodInfo">

<h3>{item.name}</h3>

<p>₹ {item.price}</p>

</div>

{quantity===0 ? (

<button
className="addBtn"
onClick={()=>addItem(item)}
>
+
</button>

):(

<div className="quantityControls">

<button onClick={()=>decreaseItem(item._id)}>
-
</button>

<span>{quantity}</span>

<button onClick={()=>addItem(item)}>
+
</button>

</div>

)}

</div>

</div>

)

}