import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

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
    font-size: 30px;
    font-weight: 200;
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
                        <Image src={item.image} />
                        <Details>
                            <ProductName>
                                <b>Product:</b> {item.title}
                            </ProductName>
                            <ProductId>
                                <b>ID:</b> {item.id}
                            </ProductId>
                            <ProductColor color="black" />
                            <ProductSize>
                                <b>Description:</b> {item.description}
                            </ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            {/* <Add /> */}
                            <TopText style={{ textDecoration: 'none' }} >Quantity :</TopText>
                            <input style={{ borderRadius: "8px", border: "3px solid black" }} min="1" type="number" id="qty" name="qty" value={input} onChange={qtyHandler} />
                            {/* <Remove /> */}
                        </ProductAmountContainer>
                        <ProductPrice>Price : Rp {item.price}</ProductPrice>
                    </PriceDetail>
                </Product>
                <Hr />
            </Info>
        </>
    )
}

export default CartItem