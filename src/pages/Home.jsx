import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import ProductDetail from "../components/ProductDetail";
import Slider from "../components/Slider";
import styled from "styled-components";
import Axios from "axios";
import { API_URL } from '../constants/API'
import { useSelector, useDispatch } from "react-redux";

const ContainerProduct = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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
      <h2>CATEGORIES:</h2>
      <Categories />
      <h2>LATEST PRODUCTS:</h2>
      <ContainerProduct>
        {products.map((product) => (
          <ProductDetail product={product} key={product.id} />
        ))}
      </ContainerProduct>
      <Footer />
    </div>
  );
};

export default Home;
