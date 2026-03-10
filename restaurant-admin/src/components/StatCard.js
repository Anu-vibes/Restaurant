import "../css/analytics.css"

export default function StatCard({icon,value,label}){

return(

<div className="statCard">

<img src={icon} className="statIcon" alt={label}/>

<div>

<h2>{value}</h2>
<p>{label}</p>

</div>

</div>

)

}