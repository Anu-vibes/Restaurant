import {useState} from "react"
import {useNavigate} from "react-router-dom"
import "../css/form.css"

export default function CustomerForm(){

const navigate=useNavigate()

const [form,setForm]=useState({
name:"",
persons:1,
contact:"",
address:""
})

const submit=()=>{

localStorage.setItem("customer",JSON.stringify(form))

navigate("/menu")

}

return(

<div className="formContainer">

<h1>Welcome</h1>

<input
placeholder="Name"
onChange={e=>setForm({...form,name:e.target.value})}
/>

<input
type="number"
placeholder="Number of persons"
onChange={e=>setForm({...form,persons:e.target.value})}
/>

<input
placeholder="Contact"
onChange={e=>setForm({...form,contact:e.target.value})}
/>

<input
placeholder="Address"
onChange={e=>setForm({...form,address:e.target.value})}
/>

<button onClick={submit}>Start Order</button>

</div>

)
}