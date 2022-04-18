import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import Footer2 from "../components/Footer2";

import CartItem from "../components/CartItem.jsx";

const Cart = () => {

  const cart = useSelector(state => state.cartReducer.cart)

  const shippingDummy = 12000

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    let price = 0;
    let items = 0;

    cart.forEach(item => {
      items += item.qty
      price += item.qty * item.price
    })

    setTotalItems(items)
    setTotalPrice(price)
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])

  return (
    <>
      <div className={styles.cart}>
        <div className={styles.cart__items}>
          {cart.map(item => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div className={styles.cart__summary}>
          <h4 className={styles.summary__title}>Order Summary</h4>
          <div className={styles.summary__price}>
            <span><b>SUBTOTAL : </b>  ( {totalItems} items )</span>
            <span>Rp.{totalPrice}</span>
          </div>
          <select name="shipping" className="select" >
            <option value="" disabled selected >Shipping Options</option>
            <option value="">JNE</option>
            <option value="">TIKI</option>
            <option value="">JNT</option>
          </select>
          <div className={styles.summary__price}>
            <span><b>Estimated Shipping : </b></span>
            <span>Rp.12000</span>
          </div>
          <div className={styles.summary__price}>
            <span><b>TOTAL : </b></span>
            <span>Rp.{totalPrice + shippingDummy}</span>
          </div>
          <Button className="btn btn-info" style={{ fontWeight: "bold" }} >
            Proceed To Checkout
          </Button>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default Cart;
