import { React, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Payment from "./pages/payment";
import Checkout from "./pages/Checkout";
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
import AddProduct from "./components/admin/products/AddProduct";
import DetailProduct from "./components/admin/products/DetailProduct";
import EditProduct from "./components/admin/products/EditProduct";
import RegisterAdmin from "./pages/admin/register/RegisterAdmin";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token_shutter")) {
      Axios.post(
        `${API_URL}/users/keep-login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token_shutter")
            )}`,
          },
        }
      )
        .then((res) => {
          // console.log(res.data);
          localStorage.setItem("token_shutter", JSON.stringify(res.data.token));
          dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: res.data.dataLogin,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (localStorage.getItem("token_shutter_admin")) {
      Axios.post(
        `${API_URL}/admin/keep-login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token_shutter_admin")
            )}`,
          },
        }
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
  }, [dispatch]);

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
          <Route element={<Checkout />} path="/checkout" />
          <Route element={<Payment />} path="/payment" />

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
          <Route element={<RegisterAdmin />} path="/admin/register" />

          <Route element={<List />} path="/admin/users" />
          <Route element={<ProductAdmin />} path="/admin/products" />
          <Route element={<AddProduct />} path="/admin/add-product" />
          <Route element={<DetailProduct />} path="/admin/product-detail/:id" />
          <Route element={<EditProduct />} path="/admin/product-edit/:id" />
        </Routes>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
};

export default App;
