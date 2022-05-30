import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { API_URL } from '../constants/API'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { debounce } from 'throttle-debounce';



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

const CartItem = ({ item, setCart, setTotalPrice, setTotalItems }) => {

    let [input, setInput] = useState(item.qty)
    const dispatch = useDispatch()
    const description = item.product.description.slice(0, 140)

    const userId = useSelector(state => state.authUserLogin.id)
    const stockReady = item.product.stock

    // price thousand separator
    const price = item.product.sell_price.toLocaleString()
    const debounceUpdate = useCallback(
        debounce(300, async (value) => {
            console.log(value)
            const response = await axios.patch(`${API_URL}/cart/update/${item.id}/user/${userId}`, {
                qty: value
            })
            console.log(response.data)
            setTotalItems(response.data.count)
            setTotalPrice(response.data.subTotal)
        }), []
    )

    useEffect(() => {
        let maxQty = input
        if (maxQty > stockReady) {
            maxQty = stockReady
        } else {
            debounceUpdate(input)
        }
    }, [input])

    const deleteHandler = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, your item will be gone!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${API_URL}/cart/delete-cart/${id}/user/${+userId}`)
                        .then(response => {
                            dispatch({
                                type: 'CART_COUNT',
                                payload: response.data.length
                            })
                            setCart(response.data.remainingCart)
                            setTotalItems(response.data.count)
                            setTotalPrice(response.data.subTotal)
                            swal('One item has been deleted!', {
                                icon: "success",
                            });
                        })
                        .catch(err => console.log(err))

                } else {
                    swal("Your cart is safe!");
                }
            });
    }

    return (
        <>
            <Info>
                <Product>
                    <ProductDetail>
                        <Link to={`/product-detail/${item.product.id}`} >
                            <Image src={`${API_URL}/${item.product.image}`} />
                        </Link>
                        <Details>
                            <ProductName>
                                <b>Product:</b> {item.product.name}
                            </ProductName>
                            <ProductName>
                                <b>Category:</b> {item.product.category.name}
                            </ProductName>
                            <ProductName>
                                <b>Stock:</b> {item.product.stock}
                            </ProductName>
                            <br />
                            <ProductSize>
                                {/* <b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad */}
                                {/* <b>Description:</b> {description} . . . */}
                            </ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            {/* <Add /> */}
                            <TopText style={{ textDecoration: 'none', paddingTop: "20px" }} >Quantity . . .</TopText>
                            <input style={{ borderRadius: "8px", border: "3px solid black", width: "200px" }} min="1" max={stockReady} type="number" id="qty" name="qty" value={input} onChange={(e) => setInput(+e.target.value)} />
                            {/* <Remove /> */}
                        </ProductAmountContainer>
                        <ProductPrice style={{ paddingLeft: "70px", color: "#3CB371" }} >Price : Rp {price}</ProductPrice>
                        <Button style={{ marginTop: "55px", marginLeft: "68px" }} className="btn btn-danger" onClick={() => deleteHandler(item.id)} >
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