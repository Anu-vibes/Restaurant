import {useRef,useState} from "react"

import "../css/swipe.css"

export default function SwipeOrder({placeOrder}){

const sliderRef=useRef(null)

const [dragging,setDragging]=useState(false)
const [position,setPosition]=useState(0)

const startDrag=e=>{
setDragging(true)
}

const onDrag=e=>{

if(!dragging) return

const rect=sliderRef.current.getBoundingClientRect()

let x=e.clientX-rect.left

if(x<0) x=0
if(x>rect.width-60) x=rect.width-60

setPosition(x)

}

const endDrag=()=>{

setDragging(false)

const width=sliderRef.current.offsetWidth

if(position>width*0.7){

placeOrder()

}

setPosition(0)

}

return(

<div
className="swipeContainer"
ref={sliderRef}
onMouseMove={onDrag}
onMouseUp={endDrag}
onMouseLeave={endDrag}
>

<div className="swipeText">

Swipe to Order

</div>

<div
className="swipeButton"
style={{left:position}}
onMouseDown={startDrag}
>

→

</div>

</div>

)

}
