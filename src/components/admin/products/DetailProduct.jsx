import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Table.css'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { API_URL } from '../../../constants/API'
import DetailProductComponent from './DetailProductComponent'
import axios from 'axios'

const DetailProduct = () => {

    const [product, setProduct] = useState()

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${API_URL}/products/get-product-byId/${id}`)
            .then(response => {
                console.log(response.data)
                setProduct(response.data)
            })
            .catch(err => console.log(err.message))
    }, [])

    return (
        <div className='inner-container' >
            <div className='form-container' >
                <div className="header">
                    <Link to="/admin/products" >
                        <Button color='light' size='lg' >
                            <ion-icon name="chevron-back-circle-outline" size="large" ></ion-icon>
                        </Button>
                    </Link>
                    <h4 >Product Detail</h4>
                </div>
                <DetailProductComponent product={product} />
            </div >
        </div>
    )
}

export default DetailProduct