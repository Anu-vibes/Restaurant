import {useState} from "react"
import api from "../api/api"
import Sidebar from "../components/Sidebar"
import "../css/addItem.css"

export default function AddItem(){

const [form,setForm]=useState({
name:"",
description:"",
price:"",
averagePreparationTime:"",
category:"",
stock:""
})

const submit = async () => {

await api.post("/menu/create",form)

setForm({
name:"",
description:"",
price:"",
averagePreparationTime:"",
category:"",
stock:""
})

}

return(

<div className="page">

<Sidebar/>

<div className="content">

<div className="addItemPage">

<h1>Add New Dish</h1>

<label>name</label>
<input
value={form.name}
placeholder="name"
onChange={e=>setForm({...form,name:e.target.value})}
/>

<label>description</label>
<input
value={form.description}
placeholder="description"
onChange={e=>setForm({...form,description:e.target.value})}
/>

<label>price</label>
<input
value={form.price}
placeholder="price"
onChange={e=>setForm({...form,price:e.target.value})}
/>

<label>average prep time</label>
<input
value={form.averagePreparationTime}
placeholder="time in minutes"
onChange={e=>setForm({...form,averagePreparationTime:e.target.value})}
/>

<select
value={form.category}
onChange={e=>setForm({...form,category:e.target.value})}
>
<option value="">Select category</option>
<option>Pizza</option>
<option>Burger</option>
<option>Drink</option>
<option>French fries</option>
<option>Veggies</option>
</select>

<label>stock</label>
<input
value={form.stock}
placeholder="stock"
onChange={e=>setForm({...form,stock:e.target.value})}
/>

<button onClick={submit}>Add New Dish</button>

</div>

</div>

</div>

)

}