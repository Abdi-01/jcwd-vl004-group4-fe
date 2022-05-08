import Axios from "axios";
import { Add, Category, Details, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { API_URL } from "../constants/API";
import axios from 'axios'
import swal2 from 'sweetalert'

import { useState, useEffect } from "react";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  padding: 50px
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 35px;
`;

const Text = styled.p`
  padding-top: 10px;
  font-weight: 300;
  font-size: 20px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 15px;
`;

const Button = styled.button`
  padding: 10px;
  border: 3px 50% black;
  border-radius: 50px;
  background-color: #e0e0e0;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [productDetail, setProductDetail] = useState({
    name: "",
    stock: 0,
    unit: "",
    volume: 0,
    buy_price: 0,
    sell_price: 0,
    description: "",
    category: {},
    image: "",
  });
  console.log(productDetail);

  const navigate = useNavigate()
  const userGlobal = useSelector(state => state.authUserLogin)
  const userToken = localStorage.getItem('token_shutter')


  const [productNotFound, setProductNotFound] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const dispatch = useDispatch()

  const addToCart = () => {

    // login is required
    if (!userToken) {
      swal2("Log in is required!");
      navigate('/login')
    } else {
      const data = {
        qty: quantity,
        userId: userGlobal.id,
        productId: productDetail.id
      }
      axios.post(`${API_URL}/cart/add-cart`, data)
        .then(response => {
          console.log(response.data)
          if (response.data.conflict) {
            return swal2(response.data.warning, response.data.conflict, "error");
          } else if (response.data.count) {
            dispatch({
              type: "CART_COUNT",
              payload: response.data.count
            })
          }
          swal2("Success!", response.data.message, "success");
        })
        .catch(err => {
          console.log(err.message)
          swal2("Failed!", "Cannot add item to cart", "error");
        })
    }

  }

  // to get product detail
  const fetchProductDetail = () => {
    Axios.get(
      "http://localhost:5000/products/get-product-byId/" + params.productId
    )
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          setProductDetail(result.data);
          setProductNotFound(false);
          console.log(productDetail);
        } else {
          swal.fire({
            title: `Product with ID ${params.productId} has not been found`,
            icon: "warning",
            confirm: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);

        swal.fire({
          title: "There is some mistake in server",
          icon: "warning",
          confirm: true,
        });
      });
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  // to increase/decrease qty
  const qtyHandler = (action) => {
    if (action === "increment") {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <Container>
      <Wrapper>
        {productNotFound ? null : (
          <>
            <ImgContainer>
              {/* bcs productDetail.image is in backend} */}
              <Image src={"http://localhost:5000/" + productDetail.image} />
            </ImgContainer>
            <InfoContainer>
              <Title>{productDetail.name}</Title>
              <Desc>{productDetail.description}</Desc>
              <Price>
                Rp.{productDetail.sell_price.toLocaleString("id-ID")}
              </Price>
              <Text>Category: {productDetail.category.name}</Text>
              <Text>Stock: {productDetail.stock} pcs</Text>
              <Text>Unit: {productDetail.unit}</Text>
              <Text>Volume: {productDetail.volume}</Text>
              <Text>Bottle Capacity: {productDetail.bottle_capacity}</Text>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => qtyHandler("decrement")} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => qtyHandler("increment")} />
                </AmountContainer>
                <Button onClick={addToCart} >ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
