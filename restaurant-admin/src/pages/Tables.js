import {useEffect,useState} from "react"
import api from "../api/api"
import socket from "../sockets/socket"

import Sidebar from "../components/Sidebar"
import TableCard from "../components/TableCard"

import "../css/tables.css"

export default function Tables(){

const [tables,setTables]=useState([])
const [showModal,setShowModal]=useState(false)

const [capacity,setCapacity]=useState(3)
const [name,setName]=useState("Table")

const loadTables=()=>{

api.get("/tables").then(res=>setTables(res.data))

}

useEffect(()=>{

loadTables()

socket.on("tableUpdate",()=>{

loadTables()

})

},[])

const createTable=async()=>{

await api.post("/tables/create",{

capacity,
name

})

setShowModal(false)

loadTables()

}

return(

<div className="page">

<Sidebar/>

<div className="content">

<h1>Tables</h1>

<div className="tableStats">

<p>Total Tables: {tables.length}</p>

<p>Occupied: {tables.filter(t=>t.occupied).length}</p>

</div>

<div className="tablesGrid">

{tables.map(t=>(
<TableCard
key={t._id}
table={t}
refresh={loadTables}
/>
))}

<div
className="addTable"
onClick={()=>setShowModal(true)}
>

+

</div>

</div>

{showModal && (

<div className="modal">

<div className="modalBox">

<p className="modalTitle">

Table name (optional)

</p>

<input
value={name}
onChange={e=>setName(e.target.value)}
/>

<p className="chairLabel">

Chair

</p>

<select
value={capacity}
onChange={e=>setCapacity(e.target.value)}
>

<option value="2">02</option>
<option value="3">03</option>
<option value="4">04</option>
<option value="6">06</option>

</select>

<button onClick={createTable}>

Create

</button>

</div>

</div>

)}

</div>

</div>

)

}