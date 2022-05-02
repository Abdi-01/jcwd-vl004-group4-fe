import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Product from "../components/Product";
import Slider from "../components/Slider";
import styled from "styled-components";
import Axios from "axios";
import { API_URL } from '../constants/API'
import { useSelector } from "react-redux";

const ContainerProduct = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Home = () => {


  // DATA ASLI
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProductsData = async () => {
      const {data} = await Axios.get(`${API_URL}/products/get-all-products`)
      console.log(data.rows)
      setProducts(data.rows)
    }
    getProductsData()
  }, [])

  // DUMMY DATA
  // const products = useSelector(state => state.cartReducer.products)
  // console.log(products)

  return (
    <div>
      <Slider />
      <h2>CATEGORIES:</h2>
      <Categories />
      <h2>PRODUCTS:</h2>
      <ContainerProduct>
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </ContainerProduct>
      <Footer />
    </div>
  );
};

export default Home;
