import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { Button } from 'react-bootstrap'
import axios from "axios";
import { API_URL } from "../constants/API";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux'

import CartItem from "../components/CartItem.jsx";

const Cart = () => {

  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  let [totalItems, setTotalItems] = useState(0)

  const userId = useSelector(state => state.authUserLogin.id)

  const shippingDummy = 12000


  useEffect(() => {
    const fetchCartItems = () => {
      axios.get(`${API_URL}/cart/user/${+userId}`)
        .then(response => {
          console.log(response.data.rows)
          setTotalItems(response.data.cartCount)
          setTotalPrice(response.data.totalPrice)
          setCart(response.data.rows)
        })
        .catch(err => console.log(err))
    }
    fetchCartItems()
  }, [userId])

  // thousand separator totalPrice
  const finalPrice = (totalPrice + shippingDummy).toLocaleString()

  // useEffect(() => {
  //   let price = 0;
  //   let items = 0;

  //   cart.forEach(item => {
  //     items += item.qty
  //     price += item.qty * item.product.sell_price
  //   })
  //   console.log(`totalitems: ${totalItems}`)

  //   setTotalItems(items)
  //   setTotalPrice(price)
  // }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])

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
          <Button className="btn btn-info" style={{ fontWeight: "bold" }} >
            Proceed To Checkout
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
