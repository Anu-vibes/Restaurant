import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"

import "../css/success.css"

export default function OrderSuccess(){

const navigate=useNavigate()

const [count,setCount]=useState(3)

useEffect(()=>{

const interval=setInterval(()=>{

setCount(c=>c-1)

},1000)

setTimeout(()=>{

navigate("/menu")

},3000)

return ()=>clearInterval(interval)

},[])

return(

<div className="successScreen">

<h2>Thanks For Ordering</h2>

<div className="checkCircle">

<img src="/icons/check.png" alt="success"/>

</div>

<p className="redirectText">

Redirecting in {count}

</p>

</div>

)

}
