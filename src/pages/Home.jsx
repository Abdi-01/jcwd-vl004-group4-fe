import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";


const Home = () => {
  const userId = useSelector((state) => state.authUserLogin.id);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  // DATA ASLI
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = () => {
      Axios.get(`${API_URL}/cart/user/${+userId}`).then((response) => {
        setCartItems(response.data.rows);
        dispatch({
          type: "CART_COUNT",
          payload: response.data.count,
        });
      });
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await Axios.get(`${API_URL}/products/get-all-products`, {
        params: {
          sortField: "createdAt",
          sortDirection: "DESC",
          limit: 4,
        },
      });
      console.log(data.allProducts);
      setProducts(data.allProducts);
    };
    getProductsData();
  }, []);

  // DUMMY DATA
  // const products = useSelector(state => state.cartReducer.products)
  // console.log(products)

  return (
    <div>
      <Slider />
      <h2 style={{ marginTop: "10px" }}>CATEGORIES:</h2>
      <Categories />
      <h2>NEW PRODUCTS:</h2>
      <Products products={products}/>
      <Footer />
    </div>
  );
};

export default Home;
