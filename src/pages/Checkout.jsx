import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Footer from "../components/Footer";
import './Checkout.css'
import axios from 'axios'
import { useSelector } from "react-redux";
import { API_URL } from "../constants/API";
import CheckoutItem from "../components/CheckoutItem";
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Checkout = () => {

    const shipping = 12000
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [checkoutItems, setCheckoutItems] = useState([])
    const [paymentImg, setPaymentImg] = useState()
    const [invoiceHeaderId, setinvoIceHeaderId] = useState()

    const userId = useSelector(state => state.authUserLogin.id)
    const [subTotal, setSubTotal] = useState(0)
    // console.log(`user id: ${userId}`)

    useEffect(() => {
        const fetchCheckoutItems = () => {
            axios.get(`${API_URL}/cart/user/${+userId}`)
                .then(response => {
                    console.log(response.data)
                    setCheckoutItems(response.data.rows)
                    setSubTotal(response.data.totalPrice)
                })
                .catch(err => console.log(err.message))
        }
        fetchCheckoutItems()
    }, [userId])

    const getHeaderId = () => {
        axios.post(`${API_URL}/payment/get-header-id/${+userId}`)
            .then(response => setinvoIceHeaderId(response.data.id))
            .catch(error => console.log(error.message))
    }
    getHeaderId()

    const uploadHandler = e => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', paymentImg)
        data.append('invoiceHeaderId', invoiceHeaderId)
        data.append('adminId', 1)

        console.log(data)
        axios.post(`${API_URL}/payment/add-payment/${userId}`, data)
            .then(response => {
                swal("Payment has been recorded!", response.data, "success");
                dispatch({
                    type: 'CART_COUNT',
                    payload: 0
                })
                navigate('/')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <>
            <div classNameName={styles.cart}>
                <div className="container">
                    <h1 className="checkout_heading detail-full title">Checkout</h1>

                    <div className="details">
                        <form onSubmit={uploadHandler}>
                            <div className="details__column">
                                <h3 className="detail-full details__header">Billing Address</h3>

                                <div className="form-item detail-full">
                                    <label for="fname"><i className="fa fa-user"></i> Full Name</label>
                                    <input
                                        type="text"
                                        id="fname"
                                        name="firstname"
                                        placeholder="John M. Doe"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-full">
                                    <label for="email"><i className="fa fa-envelope"></i> Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-full">
                                    <label for="adr"
                                    ><i className="fa fa-address-card-o"></i> Address</label
                                    >
                                    <input
                                        type="text"
                                        id="adr"
                                        name="address"
                                        placeholder="542 W. 15th Street"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-full">
                                    <label for="city"><i className="fa fa-institution"></i> City</label>
                                    <input type="text" id="city" name="city" placeholder="New York" required />
                                </div>

                                <div className="form-item detail-half-1">
                                    <label for="state">State</label>
                                    <input type="text" id="state" name="state" placeholder="NY" required />
                                </div>

                                <div className="form-item detail-half-2">
                                    <label for="zip">Zip</label>
                                    <input type="text" id="zip" name="zip" placeholder="10001" required />
                                </div>

                                <h3 className="detail-full details__header">Payment</h3>

                                <div className="form-item detail-full">
                                    <label for="cname">Name on Card</label>
                                    <input
                                        type="text"
                                        id="cname"
                                        name="cardname"
                                        placeholder="John More Doe"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-full">
                                    <label for="ccnum">Credit card number</label>
                                    <input
                                        type="text"
                                        id="ccnum"
                                        name="cardnumber"
                                        placeholder="1111-2222-3333-4444"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-half-1">
                                    <label for="expmonth">Exp Month</label>
                                    <input
                                        type="text"
                                        id="expmonth"
                                        name="expmonth"
                                        placeholder="September"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-half-2">
                                    <label for="expyear">Exp Year</label>
                                    <input
                                        type="text"
                                        id="expyear"
                                        name="expyear"
                                        placeholder="2018"
                                        required
                                    />
                                </div>

                                <div className="form-item detail-full">
                                    <label for="cvv">CVV</label>
                                    <input type="text" id="cvv" name="cvv" placeholder="352" required />
                                </div>

                                <div className="flex">
                                    <label htmlFor="payment">Payment Proof right here!</label>
                                    <input type="file" id="file" accept=".jpg" required onChange={event => {
                                        const file = event.target.files[0]
                                        setPaymentImg(file)
                                    }} />
                                </div>
                                <button className="detail-full detail__submit" type="submit">Upload Payment!</button>
                            </div>
                        </form>
                    </div>

                    <div className="cart">
                        <h3 className="details__header">Your Order</h3>

                        <div className="cart__list">
                            {checkoutItems.map(item => (
                                <CheckoutItem item={item} />
                            ))}
                        </div>

                        <div className="cart__price">
                            <div className="price__detail">
                                <h4>Subtotal</h4>
                                <p>IDR {subTotal.toLocaleString()}</p>
                            </div>
                            <div className="price__detail">
                                <h4>Shipping</h4>
                                <p>IDR {shipping.toLocaleString()}</p>
                            </div>
                            <div className="price__total">
                                <h4>Total</h4>
                                <p>IDR {(subTotal + shipping).toLocaleString()}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
