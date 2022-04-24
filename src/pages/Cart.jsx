import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { Button } from 'react-bootstrap'
import axios from "axios";
import { API_URL } from "../constants/API";
import Footer from "../components/Footer";

import CartItem from "../components/CartItem.jsx";

const Cart = () => {

  // const cart = useSelector(state => state.cartReducer.cart)
  // console.log(cart)

  const [cart, setCart] = useState([])

  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await axios.get(`${API_URL}/products/get-all-products`)

      console.log(data)
      // data[0].qty = 2;
      setCart(data)
    }
    getProductsData()
  }, [])

  const shippingDummy = 12000

  const [totalPrice, setTotalPrice] = useState(0)
  let [totalItems, setTotalItems] = useState(0)

  // thousand separator totalPrice
  const finalPrice = (totalPrice + shippingDummy).toLocaleString()


  useEffect(() => {
    let price = 0;
    let items = 0;

    cart.forEach(item => {
      items += item.qty
      price += item.qty * item.sell_price
    })
    console.log(`totalitems: ${totalItems}`)

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
            <span>Rp.{totalPrice.toLocaleString()}</span>
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
