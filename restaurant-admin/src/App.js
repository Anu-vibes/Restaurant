import {BrowserRouter,Routes,Route} from "react-router-dom"

import Analytics from "./pages/Analytics"
import Tables from "./pages/Tables"
import OrderLine from "./pages/OrderLine"
import AddItem from "./pages/AddItem"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Analytics/>}/>
<Route path="/tables" element={<Tables/>}/>
<Route path="/orders" element={<OrderLine/>}/>
<Route path="/add-item" element={<AddItem/>}/>

</Routes>

</BrowserRouter>

)

}

export default App