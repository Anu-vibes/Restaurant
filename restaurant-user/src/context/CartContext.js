import {createContext,useState} from "react"

export const CartContext=createContext()

export default function CartProvider({children}){

const [cart,setCart]=useState([])

const addItem=(item)=>{

const exists=cart.find(c=>c._id===item._id)

if(exists){

setCart(cart.map(c=>
c._id===item._id
? {...c,quantity:c.quantity+1}
: c
))

}else{

setCart([...cart,{...item,quantity:1}])

}

}

const decreaseItem=(id)=>{

const exists=cart.find(c=>c._id===id)

if(!exists) return

if(exists.quantity===1){

setCart(cart.filter(c=>c._id!==id))

}else{

setCart(cart.map(c=>
c._id===id
? {...c,quantity:c.quantity-1}
: c
))

}

}

const getQuantity=(id)=>{

const item=cart.find(c=>c._id===id)

return item ? item.quantity : 0

}

return(

<CartContext.Provider value={{
cart,
addItem,
decreaseItem,
getQuantity
}}>

{children}

</CartContext.Provider>

)

}