import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./components/Success/Success";
import Invoice from "./pages/Invoice/Invoice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<AllProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path=":productId" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="invoices" element={<Invoice />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
