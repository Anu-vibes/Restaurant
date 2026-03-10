import {useEffect,useState,useContext,useRef} from "react"
import api from "../api/api"
import MenuItemCard from "../components/MenuItemCard"
import {CartContext} from "../context/CartContext"
import {useNavigate} from "react-router-dom"

import "../css/menu.css"

export default function Menu(){

const [items,setItems]=useState([])
const [category,setCategory]=useState(null)
const [search,setSearch]=useState("")
const [page,setPage]=useState(1)
const [loading,setLoading]=useState(false)

const {cart}=useContext(CartContext)

const navigate=useNavigate()

const loader=useRef(null)

const categories=[
{label:"Burger",icon:"/icons/burger.png"},
{label:"Pizza",icon:"/icons/pizza.png"},
{label:"Drink",icon:"/icons/drink.png"},
{label:"French fries",icon:"/icons/fries.png"},
{label:"Veggies",icon:"/icons/veggies.png"}
]

useEffect(()=>{

setItems([])
setPage(1)

loadItems(1,true)

},[category])

const loadItems=async(p,reset=false)=>{

if(loading) return

setLoading(true)

try{

const res=await api.get("/menu",{
params:{
page:p,
limit:6,
category:category || undefined
}
})

if(reset){
setItems(res.data)
}else{

setItems(prev=>{
const existing=new Set(prev.map(i=>i._id))
const fresh=res.data.filter(i=>!existing.has(i._id))
return [...prev,...fresh]
})

}

}catch(err){

console.error(err)

}

setLoading(false)

}

useEffect(()=>{

const observer=new IntersectionObserver(entries=>{

if(entries[0].isIntersecting && !loading){

const nextPage=page+1
setPage(nextPage)

loadItems(nextPage)

}

})

const current=loader.current

if(current){
observer.observe(current)
}

return ()=>{

if(current){
observer.unobserve(current)
}

}

},[page,category,loading])

const filteredItems=items.filter(i=>
i.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="menuPage">

<h2>Good evening</h2>
<p>Place your order here</p>

<input
className="searchBar"
placeholder="Search"
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<div className="categoryTabs">

{categories.map(c=>(

<div
key={c.label}
className={`tab ${category===c.label?"active":""}`}
onClick={()=>setCategory(c.label)}
>

<img src={c.icon} alt=""/>

<span>{c.label}</span>

</div>
))}

</div>

<h1>{category || "Menu"}</h1>

<div className="menuGrid">

{filteredItems.map(i=>( <MenuItemCard key={i._id} item={i}/>
))}

</div>

<div ref={loader} style={{height:"40px"}}></div>

<button
className="nextButton"
onClick={()=>navigate("/cart")}

>

Next ({cart.length})

</button>

</div>

)

}
