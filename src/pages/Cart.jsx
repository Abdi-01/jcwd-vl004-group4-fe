import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom'
import CartItem from "../components/CartItem.jsx";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import './Cart.css'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const cart = useSelector(state => state.cartReducer.cart)
  // console.log(cart)

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    let price = 0;
    let items = 0;

    cart.forEach(item => {
      items = + item.qty
      price = + item.qty * item.price
    })

    setTotalItem(items)
    setTotalPrice(price)
  }, [cart, totalPrice, totalItem, setTotalItem, setTotalPrice])

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/product-list" >
            <TopButton style={{ border: "3px solid", borderRadius: "8px" }} className='btn' >CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText style={{ textDecoration: 'none' }} >Shopping Bag (2)</TopText>
          </TopTexts>
          {/* <TopButton style={{ border: "3px solid", borderRadius: "8px" }} type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          {cart.map(item => (
            <CartItem item={item} key={item.id} />
          ))}
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              {/* <SummaryItemText>Shipping Discount</SummaryItemText> */}
              {/* <SummaryItemPrice>$ -5.90</SummaryItemPrice> */}
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total Price :</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <Button className="glow-on-hover">CHECKOUT NOW</Button>
            {/* <button className="glow-on-hover" >Checkout Now</button> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
