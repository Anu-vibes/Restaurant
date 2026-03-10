import "../css/tables.css"
import api from "../api/api"

export default function TableCard({table,refresh}){

const deleteTable=async()=>{

await api.delete("/tables/"+table._id)

refresh()

}

let statusClass="available"

if(table.occupied) statusClass="taken"

return(

<div className={`tableCard ${statusClass}`}>

<img
src="/icons/delete.png"
className="deleteIcon"
alt="delete"
onClick={deleteTable}
/>

<p className="tableName">

{table.name || "Table"}

</p>

<h1 className="tableNumber">

{String(table.tableNumber).padStart(2,"0")}

</h1>

<div className="tableCapacity">

<img src="/icons/chair.png" alt="chair"/>

<span>{table.capacity}</span>

</div>

</div>

)

}