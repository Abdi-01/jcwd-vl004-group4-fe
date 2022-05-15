import { React, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import ProductDetail from "./pages/ProductDetail";
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
import DisplayReport from "./pages/DisplayReport";
import { API_URL } from "./constants/API";
import { useDispatch } from "react-redux";
import Axios from "axios";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminForgetPassword from "./pages/admin/AdminForgetPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import { FilterReport } from "./pages/FilterReport";
import DisplayTransaction from "./pages/DisplayTransaction";

const App = () => {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();
  const dispatch = useDispatch();

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
            dispatch({
              type: "USER_LOGIN_SUCCESS",
              payload: res.data.dataLogin,
            });
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
            dispatch({
              type: "ADMIN_LOGIN_SUCCESS",
              payload: res.data.dataLogin,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [user, admin, dispatch]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Verification />} path="/verification/:token" />
        <Route element={<Login />} path="/login" />
        <Route element={<ForgetPassword />} path="/forget-password" />
        <Route element={<ResetPassword />} path="/reset-password/:token" />
        <Route element={<Profile />} path="/profile/:userId" />
        <Route element={<Cart />} path="/cart" />

          <Route element={<ProductList />} path="/product-list" />

          <Route
            element={<ProductDetail />}
            path="/product-detail/:productId"
          />

          <Route
            element={<DisplayTransaction />}
            path="/admin/display-transaction"
          />
          <Route element={<DisplayReport />} path="/admin/display-report" />
          <Route element={<FilterReport />} path="/admin/filter-report" />
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
    </MuiPickersUtilsProvider>
  );
};

export default App;
