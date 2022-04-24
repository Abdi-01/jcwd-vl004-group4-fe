import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { API_URL } from '../constants/API'

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 25px;
    font-weight: 500;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
    `;

const CartItem = ({ item }) => {

    const [input, setInput] = useState(item.qty)
    const dispatch = useDispatch()
    console.log(item)

    // price thousand separator
    const price = item.sell_price.toLocaleString()


    const qtyHandler = (e) => {
        setInput(e.target.value)
        dispatch({
            type: "ADJUST_QTY", payload: {
                id: item.id,
                qty: e.target.value
            }
        })
    }

    return (
        <>
            <Info>
                <Product>
                    <ProductDetail>
                        <Image src={`${API_URL}/${item.image}`} />
                        <Details>
                            <ProductName>
                                <b>Product:</b> {item.name}
                            </ProductName>
                            <br />
                            <ProductSize>
                                <b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            </ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            {/* <Add /> */}
                            <TopText style={{ textDecoration: 'none', paddingTop: "20px" }} >Quantity :</TopText>
                            <input style={{ borderRadius: "8px", border: "3px solid black" }} min="1" type="number" id="qty" name="qty" value={input} onChange={qtyHandler} />
                            {/* <Remove /> */}
                        </ProductAmountContainer>
                        <ProductPrice style={{ paddingLeft: "70px", color: "#3CB371" }} >Price : Rp {price}</ProductPrice>
                        <Button style={{ marginTop: "55px", marginLeft: "68px" }} className="btn btn-danger" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.id } })} >
                            Remove Item
                        </Button>
                    </PriceDetail>
                </Product>
                <Hr />
            </Info>
        </>
    )
}

export default CartItem