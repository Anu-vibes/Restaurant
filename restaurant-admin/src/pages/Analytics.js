
// import {useEffect,useState} from "react"
// import api from "../api/api"

// import Sidebar from "../components/Sidebar"
// import StatCard from "../components/StatCard"

// import {Doughnut,Line} from "react-chartjs-2"
// import {Chart as ChartJS,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement} from "chart.js"

// import "../css/analytics.css"

// ChartJS.register(
// ArcElement,
// Tooltip,
// Legend,
// CategoryScale,
// LinearScale,
// PointElement,
// LineElement
// )

// export default function Analytics(){

// const [data,setData]=useState({})
// const [tables,setTables]=useState([])
// const [search,setSearch]=useState("")

// const [summaryRange,setSummaryRange]=useState("daily")
// const [revenueRange,setRevenueRange]=useState("daily")

// useEffect(()=>{
// api.get(`/analytics?range=${summaryRange}`).then(res=>setData(res.data))
// },[summaryRange])

// useEffect(()=>{
// api.get("/tables").then(res=>setTables(res.data))
// },[])

// const widgets=[
// {key:"chef",label:"Total Chef"},
// {key:"revenue",label:"Total Revenue"},
// {key:"orders",label:"Total Orders"},
// {key:"clients",label:"Total Clients"},
// {key:"summary",label:"Order Summary"},
// {key:"revChart",label:"Revenue"},
// {key:"tables",label:"Tables"}
// ]

// const visible=widgets.filter(w=>
// w.label.toLowerCase().includes(search.toLowerCase())
// )

// const totalOrders=(data.served||0)+(data.dinein||0)+(data.takeaway||0)

// const takeawayPercent=Math.round((data.takeaway||0)/(totalOrders||1)*100)
// const servedPercent=Math.round((data.served||0)/(totalOrders||1)*100)
// const dineinPercent=Math.round((data.dinein||0)/(totalOrders||1)*100)

// const donutData={
// labels:["Take Away","Served","Dine In"],
// datasets:[{
// data:[
// data.takeaway||0,
// data.served||0,
// data.dinein||0
// ],
// backgroundColor:["#333","#777","#bbb"],
// borderWidth:0
// }]
// }

// const revenueData={
// labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
// datasets:[{
// label:"Revenue",
// data:[5,7,6,9,7,11,8],
// borderColor:"#000",
// fill:false
// }]
// }

// return(

// <div className="page">

// <Sidebar/>

// <div className="content">

// <input
// className="searchBar"
// placeholder="Filter..."
// value={search}
// onChange={e=>setSearch(e.target.value)}
// />

// <h1 className="analyticsTitle">Analytics</h1>

// <div className="stats">

// {visible.some(v=>v.key==="chef") && <StatCard icon="/icons/chef.png" value={data.chefs||0} label="Total Chef"/>}

// {visible.some(v=>v.key==="revenue") &&
// <StatCard icon="/icons/revenue.png" value={"₹"+(data.revenue||0)} label="Total Revenue"/>}

// {visible.some(v=>v.key==="orders") && <StatCard icon="/icons/orders.png" value={data.orders||0} label="Total Orders"/>}

// {visible.some(v=>v.key==="clients") && <StatCard icon="/icons/clients.png" value={data.clients||0} label="Total Clients"/>}

// </div>

// <div className="charts">

// {visible.some(v=>v.key==="summary") &&

// <div className="chartCard">

// <div className="chartHeader">

// <h3>Order Summary</h3>

// <select
// value={summaryRange}
// onChange={e=>setSummaryRange(e.target.value)}

// >

// <option value="daily">Daily</option>
// <option value="weekly">Weekly</option>
// <option value="monthly">Monthly</option>
// </select>

// </div>

// <div className="summaryStats">

// <div className="summaryBox">
// <h3>{data.served||0}</h3>
// <p>Served</p>
// </div>

// <div className="summaryBox">
// <h3>{data.dinein||0}</h3>
// <p>Dine In</p>
// </div>

// <div className="summaryBox">
// <h3>{data.takeaway||0}</h3>
// <p>Take Away</p>
// </div>

// </div>

// <div className="summaryContent">

// <div className="donutArea">

// <Doughnut
// data={donutData}
// options={{
// maintainAspectRatio:false,
// plugins:{legend:{display:false}}
// }}
// />

// </div>

// <div className="donutStats">

// <div className="donutRow">
// <span className="dot takeaway"></span>
// <span className="label">Take Away ({takeawayPercent}%)</span>
// <div className="bar">
// <div className="fill takeaway" style={{width:`${takeawayPercent}%`}}></div>
// </div>
// </div>

// <div className="donutRow">
// <span className="dot served"></span>
// <span className="label">Served ({servedPercent}%)</span>
// <div className="bar">
// <div className="fill served" style={{width:`${servedPercent}%`}}></div>
// </div>
// </div>

// <div className="donutRow">
// <span className="dot dinein"></span>
// <span className="label">Dine In ({dineinPercent}%)</span>
// <div className="bar">
// <div className="fill dinein" style={{width:`${dineinPercent}%`}}></div>
// </div>
// </div>

// </div>

// </div>

// </div>
// }

// {visible.some(v=>v.key==="revChart") &&

// <div className="chartCard">

// <div className="chartHeader">

// <h3>Revenue</h3>

// <select
// value={revenueRange}
// onChange={e=>setRevenueRange(e.target.value)}

// >

// <option value="daily">Daily</option>
// <option value="weekly">Weekly</option>
// <option value="monthly">Monthly</option>
// <option value="yearly">Yearly</option>
// </select>

// </div>

// <div className="lineChart">

// <Line
// data={revenueData}
// options={{maintainAspectRatio:false}}
// />

// </div>

// </div>
// }

// {visible.some(v=>v.key==="tables") &&

// <div className="chartCard">

// <h3>Tables</h3>

// <div className="tableLegend">

// <div className="legendItem">
// <span className="legendDot reserved"></span>
// Reserved
// </div>

// <div className="legendItem">
// <span className="legendDot available"></span>
// Available
// </div>

// </div>

// <div className="tableMiniGrid">

// {tables.map(t=>(

// <div
// key={t._id}
// className={`miniTable ${t.occupied?"taken":""}`}
// >

// <span>Table</span> <b>{String(t.tableNumber).padStart(2,"0")}</b>

// </div>
// ))}

// </div>

// </div>
// }

// </div>

// <div className="chefTable">

// <table>

// <thead>
// <tr>
// <th>Chef Name</th>
// <th>Order Taken</th>
// </tr>
// </thead>

// <tbody>

// {data.chefStats?.map((c,i)=>(

// <tr key={i}>
// <td>{c.name}</td>
// <td>{c.orders}</td>
// </tr>
// ))}

// </tbody>

// </table>

// </div>

// </div>

// </div>

// )
// }
import {useEffect,useState} from "react"
import api from "../api/api"

import Sidebar from "../components/Sidebar"
import StatCard from "../components/StatCard"

import {Doughnut,Line} from "react-chartjs-2"
import {Chart as ChartJS,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement} from "chart.js"

import "../css/analytics.css"

ChartJS.register(
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
PointElement,
LineElement
)

export default function Analytics(){

const [data,setData]=useState({})
const [tables,setTables]=useState([])
const [search,setSearch]=useState("")

const [summaryRange,setSummaryRange]=useState("daily")
const [revenueRange,setRevenueRange]=useState("daily")

useEffect(()=>{
api.get(`/analytics?range=${revenueRange}`).then(res=>setData(res.data))
},[summaryRange])

useEffect(()=>{
api.get("/tables").then(res=>setTables(res.data))
},[])

const widgets=[
{key:"chef",label:"Total Chef"},
{key:"revenue",label:"Total Revenue"},
{key:"orders",label:"Total Orders"},
{key:"clients",label:"Total Clients"},
{key:"summary",label:"Order Summary"},
{key:"revChart",label:"Revenue"},
{key:"tables",label:"Tables"}
]

const visible=widgets.filter(w=>
w.label.toLowerCase().includes(search.toLowerCase())
)

const totalOrders=(data.served||0)+(data.dinein||0)+(data.takeaway||0)

const takeawayPercent=Math.round((data.takeaway||0)/(totalOrders||1)*100)
const servedPercent=Math.round((data.served||0)/(totalOrders||1)*100)
const dineinPercent=Math.round((data.dinein||0)/(totalOrders||1)*100)

const donutData={
labels:["Take Away","Served","Dine In"],
datasets:[
{
data:[
data.takeaway||0,
data.served||0,
data.dinein||0
],
backgroundColor:["#333","#777","#bbb"],
borderWidth:0
}
]
}

const revenueData={
labels:data.revenueLabels||[],
datasets:[
{
label:"Revenue",
data:data.revenueSeries||[],
borderColor:"#2E2E30",
backgroundColor:"transparent",
pointBackgroundColor:"#2E2E30",
pointRadius:4,
tension:0.4
}
]
}

const revenueOptions={
maintainAspectRatio:false,
plugins:{
legend:{
display:true,
labels:{
color:"#626262",
boxWidth:30
}
}
},
scales:{
x:{
grid:{
display:false
},
ticks:{
color:"#626262",
font:{
size:12
}
}
},
y:{
grid:{
color:"#E6E6E6"
},
ticks:{
color:"#626262",
font:{
size:12
}
}
}
}
}

return(

<div className="page">

<Sidebar/>

<div className="content">

<input
className="searchBar"
placeholder="Filter..."
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<h1 className="analyticsTitle">Analytics</h1>

<div className="stats">

{visible.some(v=>v.key==="chef") && <StatCard icon="/icons/chef.png" value={data.chefs||0} label="Total Chef"/>}

{visible.some(v=>v.key==="revenue") &&
<StatCard icon="/icons/revenue.png" value={"₹"+(data.revenue||0)} label="Total Revenue"/>}

{visible.some(v=>v.key==="orders") && <StatCard icon="/icons/orders.png" value={data.orders||0} label="Total Orders"/>}

{visible.some(v=>v.key==="clients") && <StatCard icon="/icons/clients.png" value={data.clients||0} label="Total Clients"/>}

</div>

<div className="charts">

{visible.some(v=>v.key==="summary") &&

<div className="chartCard">

<div className="chartHeader">

<h3>Order Summary</h3>

<select
value={summaryRange}
onChange={e=>setSummaryRange(e.target.value)}

>

<option value="daily">Daily</option>
<option value="weekly">Weekly</option>
<option value="monthly">Monthly</option>

</select>

</div>

<div className="summaryStats">

<div className="summaryBox">
<h3>{data.served||0}</h3>
<p>Served</p>
</div>

<div className="summaryBox">
<h3>{data.dinein||0}</h3>
<p>Dine In</p>
</div>

<div className="summaryBox">
<h3>{data.takeaway||0}</h3>
<p>Take Away</p>
</div>

</div>

<div className="summaryContent">

<div className="donutArea">

<Doughnut
data={donutData}
options={{
maintainAspectRatio:false,
plugins:{legend:{display:false}}
}}
/>

</div>

<div className="donutStats">

<div className="donutRow">

<span className="dot takeaway"></span>

<span className="label">
Take Away ({takeawayPercent}%)
</span>

<div className="bar">
<div
className="fill takeaway"
style={{width:`${takeawayPercent}%`}}
></div>
</div>

</div>

<div className="donutRow">

<span className="dot served"></span>

<span className="label">
Served ({servedPercent}%)
</span>

<div className="bar">
<div
className="fill served"
style={{width:`${servedPercent}%`}}
></div>
</div>

</div>

<div className="donutRow">

<span className="dot dinein"></span>

<span className="label">
Dine In ({dineinPercent}%)
</span>

<div className="bar">
<div
className="fill dinein"
style={{width:`${dineinPercent}%`}}
></div>
</div>

</div>

</div>

</div>

</div>
}

{visible.some(v=>v.key==="revChart") &&

<div className="chartCard">

<div className="chartHeader">

<h3>Revenue</h3>

<select
value={revenueRange}
onChange={e=>setRevenueRange(e.target.value)}

>

<option value="daily">Daily</option>
<option value="weekly">Weekly</option>
<option value="monthly">Monthly</option>
<option value="yearly">Yearly</option>

</select>

</div>

<div className="lineChart">

<Line
data={revenueData}
options={revenueOptions}
/>

</div>

</div>
}

{visible.some(v=>v.key==="tables") &&

<div className="chartCard">

<h3>Tables</h3>

<div className="tableLegend">

<div className="legendItem">
<span className="legendDot reserved"></span>
Reserved
</div>

<div className="legendItem">
<span className="legendDot available"></span>
Available
</div>

</div>

<div className="tableMiniGrid">

{tables.map(t=>(

<div
key={t._id}
className={`miniTable ${t.occupied?"taken":""}`}
>

<span>Table</span> <b>{String(t.tableNumber).padStart(2,"0")}</b>

</div>

))}

</div>

</div>
}

</div>

<div className="chefTable">

<table>

<thead>

<tr>
<th>Chef Name</th>
<th>Order Taken</th>
</tr>

</thead>

<tbody>

{data.chefStats?.map((c,i)=>(

<tr key={i}>
<td>{c.name}</td>
<td>{c.orders}</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)
}
