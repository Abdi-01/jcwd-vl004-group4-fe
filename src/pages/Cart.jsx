import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { Button } from 'react-bootstrap'
import axios from "axios";
import { API_URL } from "../constants/API";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import CartItem from "../components/CartItem.jsx";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Cart = () => {

  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  let [totalItems, setTotalItems] = useState(0)

  const userId = useSelector(state => state.authUserLogin.id)
  const adminId = useSelector(state => state)
  console.log(adminId)

  const shippingDummy = 12000
  const navigate = useNavigate()

  // thousand separator totalPrice
  const finalPrice = (totalPrice + shippingDummy).toLocaleString()
  const dispatch = useDispatch()


  const checkoutHandler = () => {
    swal({
      title: "Proceed checkout?",
      text: "You will be redirected to checkout page!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          localStorage.setItem('checkoutItems', JSON.stringify(cart))
          navigate('/checkout')
        } else {
          swal("You can continue shopping!");
        }
      });
  }

  useEffect(() => {
    const fetchCartItems = () => {
      axios.get(`${API_URL}/cart/user/${+userId}`)
        .then(response => {
          if (response.data.unpaidInvoice) {
            navigate('/payment')
            swal("Warning!", 'Please finish or cancel your checkout first to continue shopping!', "warning");
          } else {
            console.log(response.data.rows)
            setTotalItems(response.data.cartCount)
            setTotalPrice(response.data.totalPrice)
            setCart(response.data.rows)
            dispatch({
              type: "CART_COUNT",
              payload: response.data.count
            })
          }
        })
        .catch(err => console.log(err))
    }
    fetchCartItems()
  }, [userId])


  return (
    <>
      <div className={styles.cart}>
        {cart?.length > 0 && <div className={styles.cart__items}>
          {cart.map(item => (
            <CartItem item={item} key={item.id} setCart={setCart} setTotalItems={setTotalItems} setTotalPrice={setTotalPrice} totalPrice={totalPrice} totalItems={totalItems} />
          ))}
        </div>}
        {cart.length === 0 && <div className={styles.cart__items}>
          <h1>No item found in your cart</h1>
        </div>}
        <div className={styles.cart__summary}>
          <h4 className={styles.summary__title}>Order Summary</h4>
          <div className={styles.summary__price}>
            <span><b>SUBTOTAL : </b>( {totalItems} items )</span>
            <span>Rp.{totalPrice?.toLocaleString()}</span>
          </div>
          <select name="shipping" className="select" >
            <option value="" disabled selected >Shipping Options</option>
            <option value="">JNE</option>
            <option value="">TIKI</option>
            <option value="">JNT</option>
          </select>
          <div className={styles.summary__price}>
            <span><b>Estimated Shipping : </b></span>
            <span>Rp.{shippingDummy.toLocaleString()}</span>
          </div>
          <hr style={{ borderTop: "3px solid black" }} />
          <div className={styles.summary__price}>
            <span><b>TOTAL : </b></span>
            <span>Rp.{finalPrice}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }} >
            <Button className="btn btn-info w-100" style={{ fontWeight: "bold" }} onClick={checkoutHandler} disabled={cart.length < 1} >
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
