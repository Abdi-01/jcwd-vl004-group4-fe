import React from 'react'
import styles from "./Cart.module.css";
import Footer from '../components/Footer';
import { useState } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '../constants/API';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'


const Payment = () => {

    const [paymentImg, setPaymentImg] = useState()
    const [invoiceHeaderId, setinvoIceHeaderId] = useState()

    const userId = useSelector(state => state.authUserLogin.id)
    console.log(userId)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        // data.append('adminId', 0)

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

    const cancelHandler = () => {
        axios.delete(`${API_URL}/payment/cancel-checkout/${userId}`)
            .then(response => {
                swal({
                    title: "Are you sure want to cancel?",
                    text: "Once deleted, your cehckout record will be deleted!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal(response.data.message, {
                                icon: "success",
                            });
                            navigate('/')
                        } else {
                            swal("Your checkout is safe!");
                        }
                    });
            })
            .catch(err => console.log(err.message))
    }

    return (
        <>
            <div className={styles.cart} >
                <div className="container-payment">
                    <h1 className="checkout_heading detail-full title">Payment</h1>
                    <form onSubmit={uploadHandler}>
                        <div className='payment-in' >
                            <label for="payment"><i className=""></i><h4>Payment proof right here!</h4></label>
                            <br />
                            <input type="file" id="file" accept=".jpg" onChange={event => {
                                const file = event.target.files[0]
                                setPaymentImg(file)
                            }} />
                        </div>
                        <button className="detail-full detail__submit" type='submit' disabled={!paymentImg} style={{ width: "200px", margin: 'auto', marginTop: '20px' }} >Upload payment confirmation!</button>
                    </form>
                    <button onClick={cancelHandler} className="detail-full detail__submit" style={{ width: "200px", margin: 'auto', marginTop: '20px', backgroundColor: 'red' }} >Cancel my checkout confirmation!</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Payment