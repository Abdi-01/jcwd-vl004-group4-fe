import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Product from "../components/Product";
import Slider from "../components/Slider";
import styled from "styled-components";
import axios from 'axios'
import { API_URL } from '../constants/API'

const ContainerProduct = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await axios.get(`${API_URL}/products/get-all-products`)
      console.log(data)
      setProducts(data)
    }
    getProductsData()
  }, [])

  return (
    <div>
      <Slider />
      <Categories />
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
