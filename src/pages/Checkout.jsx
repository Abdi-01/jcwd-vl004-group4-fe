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

const Checkout = () => {

    const shipping = 12000
    const navigate = useNavigate()

    const [checkoutItems, setCheckoutItems] = useState([])

    const [totalPrice, setTotalPrice] = useState(0)

    const userId = useSelector(state => state.authUserLogin.id)


    const shippingDummy = 12000

    const checkoutPrice = totalPrice + shippingDummy

    const user = useSelector(state => state.authUserLogin)
    console.log(user)

    useEffect(() => {
        setCheckoutItems(JSON.parse(localStorage.getItem('checkoutItems')))
        console.log(checkoutItems)
        let subTotal = 0
        checkoutItems.forEach(item => {
            subTotal += item.qty * item.product.sell_price
            console.log(item)
        })
        setTotalPrice(subTotal)

    }, [userId])

    useEffect(() => {
        console.log(checkoutItems)
        let subTotal = 0
        checkoutItems.forEach(item => {
            subTotal += item.qty * item.product.sell_price
            console.log(item)
        })
        setTotalPrice(subTotal)
    }, [checkoutItems])

    const checkoutHandler = (e) => {
        // create invoice header
        e.preventDefault()
        const randomCode = Math.floor((Math.random() * 1000) + 1);
        const headerData = {
            invoice_code: randomCode,
            shipping_price: 12000,
            total_price: checkoutPrice,
            userId: userId
        }
        swal({
            title: "Proceed to checkout?",
            text: "Your checkout will be placed",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`${API_URL}/checkout/invoice/add`, headerData)
                        .then(response => {
                            if (response.data.newHeader) {
                                console.log(response.data.newHeader)
                                console.log(response.data.deleted)
                                swal('Checkout updated!', response.data.message, 'success')
                            } else {
                                console.log(response.data.invoiceHeader)
                                swal('New checkout created!', response.data.message, 'success')
                            }
                            navigate('/payment')
                        })
                        .catch(error => {
                            console.log(error.message)
                        })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    }

    return (
        <>
            <div className={styles.cart}>
                <div className="container">
                    <h1 className="checkout_heading detail-full title">Checkout</h1>

                    <div className="details">
                        <form onSubmit={checkoutHandler}>
                            <div className="details__column">
                                <h3 className="detail-full details__header">Billing Address</h3>

                                {/* <div className="form-item detail-full">
                                    <label for="fname"><i className="fa fa-user"></i> Full Name</label>
                                    <input
                                        type="text"
                                        id="fname"
                                        name="firstname"
                                        placeholder="John M. Doe"
                                        required
                                    />
                                </div> */}

                                {/* try name db */}
                                <div className="form-item detail-full">
                                    <label for="fname"><i className="fa fa-user"></i> Full Name</label>
                                    <h4>{user.name}</h4>
                                </div>

                                {/* <div className="form-item detail-full">
                                    <label for="email"><i className="fa fa-envelope"></i> Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div> */}

                                {/* try email db */}
                                <div className="form-item detail-full">
                                    <label for="email"><i className="fa fa-envelope"></i> Email</label>
                                    <h4>{user.email}</h4>
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

                                {/* try address db */}
                                <div className="form-item detail-full" >
                                    <label htmlFor="address">Choose address</label>
                                    <select name="address" id="address">
                                        <option value="">Jakarta</option>
                                    </select>
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

                                {/* <div className="flex">
                                    <label htmlFor="payment">Payment Proof right here!</label>
                                    <input type="file" id="file" accept=".jpg" required onChange={event => {
                                        const file = event.target.files[0]
                                        setPaymentImg(file)
                                    }} />
                                </div> */}
                                <button className="detail-full detail__submit" type="submit">Create Checkout!</button>
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
                                <p>IDR {totalPrice.toLocaleString()}</p>
                            </div>
                            <div className="price__detail">
                                <h4>Shipping</h4>
                                <p>IDR {shipping.toLocaleString()}</p>
                            </div>
                            <div className="price__total">
                                <h4>Total</h4>
                                <p>IDR {(totalPrice + shipping).toLocaleString()}</p>
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
