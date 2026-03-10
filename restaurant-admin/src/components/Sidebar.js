import "../css/sidebar.css"
import { Link } from "react-router-dom"

export default function Sidebar(){

return(

<div className="sidebar">

<div className="logo"></div>

<Link to="/">
<img src="/icons/dashboard.png" className="icon"/>
</Link>

<Link to="/tables">
<img src="/icons/tables.png" className="icon"/>
</Link>

<Link to="/orders">
<img src="/icons/orderline.png" className="icon"/>
</Link>

<Link to="/add-item">
<img src="/icons/add.png" className="icon"/>
</Link>

</div>

)

}