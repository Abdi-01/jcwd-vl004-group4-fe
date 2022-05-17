import React from 'react'
import FormComponent from './FormComponent'
import './Table.css'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const AddProduct = () => {
    return (
        <div className='inner-container' >
            <div className='form-container' >
                <div className="header">
                    <Link to="/admin/products" >
                        <Button color='light' size='lg' >
                            <ion-icon name="chevron-back-circle-outline" size="large" ></ion-icon>
                        </Button>
                    </Link>
                    <h4 >Add new product</h4>
                </div>
                <FormComponent />
            </div >
        </div>
    )
}

export default AddProduct