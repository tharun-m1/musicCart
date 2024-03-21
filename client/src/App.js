import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<AllProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
