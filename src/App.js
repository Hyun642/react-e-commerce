import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Signup from "./page/Signup";
import Login from "./page/Login";
import ProductDetail from "./page/ProductDetail";
import Cart from "./page/Cart";
import MyPage from "./page/MyPage";
import Address from "./page/Address";
import BusinessInfo from "./page/Seller/BusinessInfo";
import Shop from "./page/Seller/Shop";
import ProductManagement from "./page/Seller/ProductManagement";
import SellerCenter from "./page/Seller/SellerCenter";

function App() {
     return (
          <Router>
               <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/my-page" element={<MyPage />} />
                    <Route path="/my-page/address" element={<Address />} />
                    {/* Using a simple path for seller center, could be a nested route */}
                    <Route path="/seller-center" element={<SellerCenter />} />
                    <Route path="/seller-center/business" element={<BusinessInfo />} />
                    <Route path="/seller-center/shop" element={<Shop />} />
                    <Route path="/seller-center/products" element={<ProductManagement />} />
               </Routes>
          </Router>
     );
}

export default App;
