import Navbar from "./component/Header/Navbar";
import "./App.css";
import NewNav from "./component/newnavbar/NewNav";
import MainComponent from "./component/Home/MainComponent";
import Footer from "./component/footer/Footer";
import Sign_in from "./component/signup_signin/Sign_in";
import Sign_up from "./component/signup_signin/Sign_up";
import { Routes, Route } from "react-router-dom";
import Cart from "./component/cart/Cart";
import BuyNow from "./component/BuyNow/BuyNow";

function App() {
  return (
    <>
      <Navbar />
      <NewNav />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<Sign_up />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<BuyNow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
