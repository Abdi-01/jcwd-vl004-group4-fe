import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col, Container } from 'reactstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../constants/API'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const EditFormComponent = ({ id }) => {

    const navigate = useNavigate()

    const [product, setProduct] = useState([])
    const [name, setEditName] = useState(product?.name)
    const [stock, setEditStock] = useState(product?.stock)
    const [unit, setEditUnit] = useState(product?.unit)
    const [volume, setEditVolume] = useState(product?.volume)
    const [bottleCapacity, setEditBottleCapacity] = useState(product?.bottle_capacity)
    const [buyPrice, setEditBuyPrice] = useState(product?.buy_price)
    const [sellPrice, setEditSellprice] = useState(product?.sell_price)
    const [description, setEditDescription] = useState(product?.description)
    const [image, setEditImage] = useState(product?.image)
    const [categoryId, setEditCategoryId] = useState(product?.categoryId)


    useEffect(() => {
        const getUserById = () => {
            axios.get(`${API_URL}/products/get-product-byId/${id}`)
                .then(response => setProduct(response.data))
                .catch(error => console.log(error))
        }
        getUserById()
    }, [])

    const editedData = {
        name,
        stock,
        unit,
        volume,
        bottleCapacity,
        buyPrice,
        sellPrice,
        description,
        image,
        categoryId
    }

    const editProduct = (e) => {
        e.preventDefault()
        axios.patch(`${API_URL}/products/update-product/${id}`, editedData)

        swal("One Product has been updated!", `ID: ${product?.id}, Name: ${product?.name}`, "success");
        console.log(editedData)

        setEditName(editedData.name)
        setEditStock(editedData.stock)
        setEditUnit(editedData.unit)
        setEditVolume(editedData.volume)
        setEditBottleCapacity(editedData.bottleCapacity)
        setEditBuyPrice(editedData.buyPrice)
        setEditSellprice(editedData.sellPrice)
        setEditDescription(editedData.description)
        setEditImage(editedData.image)
        setEditCategoryId(editedData.categoryId)


        navigate('/admin/products')
    }


    return (
        <Form onSubmit={editProduct} >
            <FormGroup>
                <Col md={6}>
                    <FormGroup>
                        <Label for="name">Edit Name:</Label>
                        <Input
                            type='text'
                            name="name"
                            placeholder={`${product?.name}`}
                            value={name}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="stock">Edit Stock:</Label>
                        <Input
                            type='number'
                            name="stock"
                            placeholder={`${product?.stock}`}
                            value={stock}
                            onChange={(e) => setEditStock(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="unit">Edit unit:</Label>
                        <Input
                            type='text'
                            name="unit"
                            placeholder={`${product?.unit}`}
                            value={unit}
                            onChange={(e) => setEditUnit(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="volume">Edit Volume:</Label>
                        <Input
                            type='number'
                            name="volume"
                            placeholder={`${product?.volume}`}
                            value={volume}
                            onChange={(e) => setEditVolume(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="bottle">Edit Bottle Capacity:</Label>
                        <Input
                            type='number'
                            name="bottle"
                            placeholder={`${product?.bottle_capacity}`}
                            value={bottleCapacity}
                            onChange={(e) => setEditBottleCapacity(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="buyPrice">Edit Buy Price:</Label>
                        <Input
                            type='number'
                            name="buyPrice"
                            placeholder={`${product?.buy_price}`}
                            value={buyPrice}
                            onChange={(e) => setEditBuyPrice(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="sellPrice">Edit Sell Price:</Label>
                        <Input
                            type='number'
                            name="sellPrice"
                            placeholder={`${product?.sell_price}`}
                            value={sellPrice}
                            onChange={(e) => setEditSellprice(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="description">Edit Description:</Label>
                        <Input
                            type='text'
                            name="description"
                            placeholder={`${product?.description}`}
                            value="some description . . ."
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="categoryId">Edit Category Id:</Label>
                        <Input
                            type='number'
                            name="categoryId"
                            placeholder={`${product?.categoryId}`}
                            value={categoryId}
                            onChange={(e) => setEditCategoryId(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="sellPrice">New Product Image</Label>
                        <br />
                        <input type="file" id="file" accept=".jpg" onChange={event => {
                            const file = event.target.files[0]
                            setEditImage(file)
                        }} />
                    </FormGroup>
                </Col>
                <Button color="success" style={{ marginLeft: '13px', width: '570px', marginBottom: '20px' }} >Edit User</Button>
            </FormGroup>
        </Form>
    )
}

export default EditFormComponent