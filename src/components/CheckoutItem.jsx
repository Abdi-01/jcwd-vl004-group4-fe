import React from 'react'
import '../pages/Checkout.css'
import { API_URL } from "../constants/API";

const CheckoutItem = ({ item }) => {

    { item ? console.log(item) : console.log('kosong') }

    return (
        <div className="cart__item">
            <img
                className="cart__item--image"
                src={`${API_URL}/${item.product.image}`}
                alt="product"
            />
            <div className="cart__item--info">
                <h4>{item.product.name}</h4>
                <p>Qty: {item.qty}</p>
                <p>Stock: {item.product.stock}</p>
            </div>
            <div className="cart__item--price">
                <p>IDR {item.product.sell_price}/pcs</p>
            </div>
        </div>
    )
}

export default CheckoutItem