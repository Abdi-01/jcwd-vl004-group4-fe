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

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<ProductList />} path="/product-list" />
        <Route element={<Product />} path="/product-details" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<AdminLogin />} path="/admin/login" />
        <Route element={<List />} path="/admin/users" />
        <Route element={<ProductAdmin />} path="/admin/products" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
