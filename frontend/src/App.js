import './App.css';
import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './component/layout/header/Header.js';
import webFont from 'webfontloader';
import Footer from './component/layout/footer/Footer.js';
import Home from './component/home/Home.js';
import ProductDetails from './component/product/ProductDetails.js';
import Products from './component/product/Products.js';
import Search from './component/product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import {loadUser} from './actions/userAction';
import UserOptions from './component/layout/header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import ProtectedRoute from './component/route/ProtectedRoute';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';
import ConfirmOrder from './component/cart/ConfirmOrder';
import Payment from './component/cart/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSuccess from './component/cart/OrderSuccess';
import MyOrders from './component/order/MyOrders';
import OrderDetails from './component/order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductsList from './component/admin/ProductsList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import About from './component/layout/about/About';
import Contact from './component/layout/contact/Contact';
import NotFound from './component/layout/NotFound/NotFound';

function App() {
  const {isAuthenticated, user} = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapiKey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Sansita Swashed", "Sansita Swash Caps", "Sansita Swash", "Sansita"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
    <BrowserRouter>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/product/:id" element={<ProductDetails/>}></Route>
          <Route exact path="/products" element={<Products/>}></Route>
          <Route exact path="/products/:keyword" element={<Products/>}></Route>
          <Route exact path="/search" element={<Search/>}></Route>
          <Route exact path="/cart" element={<Cart/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/contact" element={<Contact/>}></Route>

          <Route exact path="/account" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route exact path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          <Route exact path="/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route exact path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>

          {stripeApiKey &&
          <Route exact path="/process/payment"
          element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>}/>}
          
          <Route exact path="/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route exact path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>

          <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
          <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>

          <Route isAdmin={true} exact path="/admin/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/products" element={<ProtectedRoute><ProductsList/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/product" element={<ProtectedRoute><NewProduct/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/product/:id" element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/orders" element={<ProtectedRoute><OrderList/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/order/:id" element={<ProtectedRoute><ProcessOrder/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/users" element={<ProtectedRoute><UsersList/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/user/:id" element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
          <Route isAdmin={true} exact path="/admin/reviews" element={<ProtectedRoute><ProductReviews/></ProtectedRoute>}/>

          <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
          <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
          <Route exact path="/login" element={<LoginSignUp/>}></Route>

          <Route path="/*" element={<NotFound />} />
          
        </Routes>
        <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
