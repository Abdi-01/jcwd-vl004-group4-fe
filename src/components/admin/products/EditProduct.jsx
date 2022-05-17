import React from 'react'
import EditFormComponent from './EditFormComponent'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useParams } from 'react-router-dom'

const EditProduct = () => {

    const { id } = useParams()

    return (
        <div className='inner-container' >
            <div className='form-container' >
                <div className="header">
                    <Link to="/admin/products" >
                        <Button color='light' size='lg' >
                            <ion-icon name="chevron-back-circle-outline" size="large" ></ion-icon>
                        </Button>
                    </Link>
                    <h4 >Edit Product</h4>
                </div>
                <EditFormComponent id={id} />
            </div >
        </div>
    )
}

export default EditProduct