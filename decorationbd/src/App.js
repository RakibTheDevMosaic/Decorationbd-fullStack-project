import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  AboutPage,
  ContactPage,
  ShopPage,
  CartPage,
  ProductDetailsPage,
  ProfilePage,
  CheckOutPage,
  ErrorPage
} from "./Routes.js";
import "./App.css";
import LayOut from "./Pages/LayOut/LayOut.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import SendResetPasswordEmail from "./components/ResetPassword/SendResetPasswordEmail.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";

const App = () => {
  const { access_token } = useSelector(state => state.auth)
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [dropDown,setDropDown] = useState(false);
  const decrementQuantity = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementQuantity = () => {
    setCount(count + 1);
  };



  return (
    <div className="scroll-smooth">
      <Routes>
        <Route path="/" element={<LayOut dropDown={dropDown} setDropDown={setDropDown} />}>
          <Route
            index
            element={
              <HomePage
                open={open}
                setOpen={setOpen}
                count={count}
                decrementQuantity={decrementQuantity}
                incrementQuantity={incrementQuantity}
               
              />
            }
          />
          <Route path="login" element={!access_token ? <LoginPage /> : <Navigate to='/profile'/>} />
          <Route path="signUp" element={!access_token ? <RegisterPage/> : <Navigate to='/profile'/>}/>
          <Route path="profile" element={access_token ? <ProfilePage /> : <Navigate to='/login'/>} />

          {/* Reset Password */}
           <Route path="sendpasswordresetemail" element={<SendResetPasswordEmail/>}/>
           <Route path="api/user/reset/:id/:token" element={<ResetPassword />} /> 

          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="shop"
            element={<ShopPage open={open} setOpen={setOpen} />}
          />
          <Route
            path="product/:name"
            element={
              <ProductDetailsPage
                count={count}
                decrementQuantity={decrementQuantity}
                incrementQuantity={incrementQuantity}
                open ={open}
                setOpen = {setOpen}
              />
            }
          />

          <Route path="cart" element={access_token?<CartPage />:<Navigate to='/login'/>} />
          <Route path="checkout" element={access_token?<CheckOutPage />:<Navigate to='/login'/>} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer/>
      </div>
  );
};

export default App;
