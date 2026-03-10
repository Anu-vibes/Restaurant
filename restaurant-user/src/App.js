import {BrowserRouter,Routes,Route} from "react-router-dom"

import CustomerForm from "./pages/CustomerForm"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import OrderSuccess from "./pages/OrderSuccess"

import CartProvider from "./context/CartContext"

function App(){

return(

<CartProvider>

<BrowserRouter>
<div className="mobileFrame">
<Routes>

<Route path="/" element={<CustomerForm/>}/>
<Route path="/menu" element={<Menu/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/success" element={<OrderSuccess/>}/>

</Routes>
</div>


</BrowserRouter>

</CartProvider>

)

}

export default App