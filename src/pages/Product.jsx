import Axios from "axios";
import { Add, Category, Details, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { API_URL } from '../constants/API'

import { useState, useEffect } from "react";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch } from "react-redux";
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
`

/*
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;
*/

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

  const [productNotFound, setProductNotFound] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();

  let userGlobal = JSON.parse(localStorage.getItem("userGlobal"));

  const dispatch = useDispatch();

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

  // const addToCartHandler = () => {
  //   Axios.get(`http://localhost:5000/cart`, {
  //     params: {
  //       userId: userGlobal.id,
  //       productId: productDetail.id,
  //     },
  //   }).then((result) => {
  //     console.log(result.data);

  //     // Initialize to zero if cart doesn't exist for product id. Otherwise add in existing quantity
  //     let initalQty = result.data.length ? result.data[0].qty : 0;
  //     Axios.patch(
  //       "http://localhost:5000/cart",
  //       {
  //         userId: userGlobal.id,
  //         qty: initalQty + quantity,
  //         productId: parseInt(params.productId),
  //       },
  //       {
  //         params: {
  //           userId: userGlobal.id,
  //           productId: productDetail.id,
  //         },
  //       }
  //     )
  //       .then(() => {
  //         swal.fire({
  //           title: "Item added sucessfully",
  //           icon: "success",
  //           confirm: true,
  //         });
  //         getCartData(userGlobal.id);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         console.log({
  //           userId: userGlobal.id,
  //           qty: initalQty + quantity,
  //           productId: parseInt(params.productId),
  //         });
  //         swal.fire({
  //           title: "There is some mistake in server",
  //           icon: "warning",
  //           confirm: true,
  //         });
  //       });
  //   });
  // };

  // logs in user with ID 1 for testing add to cart functionality.
  const dummyLoginHandler = () => {
    dispatch({
      type: "LOGIN_USER",
      payload: {
        id: 1,
      },
    });
  };

  return (
    <Container>
      <Wrapper>
        {productNotFound ? null : (
          <>
            <ImgContainer>
              {/* bcs there is no image property in table for now */}
              {/* <Image src={productDetail.image} /> */}
              <Image src="https://readyornotalberta.ca/app/uploads/2018/06/prescription-drug-pile-edit.png" />
            </ImgContainer>
            <InfoContainer>
              <Title>{productDetail.name}</Title>
              <Desc>{productDetail.description}</Desc>
              <Price>
                Rp{productDetail.sell_price.toLocaleString("id-ID")}
              </Price>
              <Text>Category: {productDetail.category.name}</Text>
              <Text>Stock: {productDetail.stock} pcs</Text>
              <Text>Unit: {productDetail.unit}</Text>
              <Text>Volume: {productDetail.volume}</Text>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => qtyHandler("decrement")} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => qtyHandler("increment")} />
                </AmountContainer>
                <Button>ADD TO CART</Button>
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
