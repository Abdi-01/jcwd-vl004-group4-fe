import { React, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";

import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";

import List from "./pages/admin/list/List";
import Admin from "./pages/Admin";
import ProductAdmin from "./components/admin/products/Product";
import AdminLogin from "./pages/admin/AdminLogin";
import Verification from "./pages/Verification";
import { API_URL } from "./constants/API";
import { connect } from "react-redux";
import { authUserLogin } from "./redux/actions/userAction";
import { authAdminLogin } from "./redux/actions/adminAction";
import Axios from "axios";
import Profile from "./pages/admin/single/Single";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminForgetPassword from "./pages/admin/AdminForgetPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import { useDispatch } from 'react-redux'

const App = (props) => {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token_shutter")) {
      const loggedInUser = localStorage.getItem("token_shutter");
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);

      if (loggedInUser) {
        Axios.post(
          `${API_URL}/users/keep-login`,
          {},
          { headers: { Authorization: `Bearer ${user}` } }
        )
          .then((res) => {
            localStorage.setItem(
              "token_shutter",
              JSON.stringify(res.data.token)
            );
            props.authUserLogin(res.data.dataLogin);
            dispatch({
              type: 'CART_COUNT',
              payload: res.data.dataLogin.carts.length
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (localStorage.getItem("token_shutter_admin")) {
      const loggedInAdmin = localStorage.getItem("token_shutter_admin");
      const foundAdmin = JSON.parse(loggedInAdmin);
      setAdmin(foundAdmin);

      if (loggedInAdmin) {
        Axios.post(
          `${API_URL}/admin/keep-login`,
          {},
          { headers: { Authorization: `Bearer ${admin}` } }
        )
          .then((res) => {
            localStorage.setItem(
              "token_shutter_admin",
              JSON.stringify(res.data.token)
            );
            props.authAdminLogin(res.data.dataLogin);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [user, admin, props]);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Verification />} path="/verification/:token" />
        <Route element={<Login />} path="/login" />
        <Route element={<ForgetPassword />} path="/forget-password" />
        <Route element={<ResetPassword />} path="/reset-password/:token" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Cart />} path="/cart" />

        <Route element={<ProductList />} path="/product-list" />

        <Route element={<Product />} path="/product-detail/:productId" />

        <Route element={<Admin />} path="/admin" />
        <Route element={<AdminLogin />} path="/admin/login" />
        <Route
          element={<AdminForgetPassword />}
          path="/admin/forget-password"
        />
        <Route
          element={<AdminResetPassword />}
          path="/admin/reset-password/:token"
        />

        <Route element={<List />} path="/admin/users" />
        <Route element={<ProductAdmin />} path="/admin/products" />
      </Routes>
    </BrowserRouter>
  );
};

export default connect(null, { authUserLogin, authAdminLogin })(App);
