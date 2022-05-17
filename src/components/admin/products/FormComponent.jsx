import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import { useState } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import { API_URL } from '../../../constants/API'
import { useNavigate } from 'react-router-dom'

const FormComponent = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [stock, setStock] = useState()
    const [unit, setUnit] = useState('')
    const [volume, setVolume] = useState()
    const [bottleCapacity, setBottleCapacity] = useState()
    const [buyPrice, setBuyPrice] = useState()
    const [sellPrice, setSellPrice] = useState()
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [categoryId, setCategoryId] = useState()


    const addNewProduct = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('name', name)
        data.append('stock', stock)
        data.append('unit', unit)
        data.append('volume', volume)
        data.append('bottle_capacity', bottleCapacity)
        data.append('buy_price', buyPrice)
        data.append('sell_price', sellPrice)
        data.append('description', description)
        data.append('image', image)
        data.append('categoryId', categoryId)

        axios.post(`${API_URL}/products/add-product`, data)
            .then(response => {
                console.log(response.data)
                swal("Successfully added!", `${response.data.name} has been added to database!`, "success");
                navigate('/admin/products')
            })
            .catch(error => console.log(error.message))

    }

    return (
        <Form onSubmit={addNewProduct}>
            <FormGroup>
                <Col md={6}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            required
                            type='text'
                            name="name"
                            placeholder='Name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="stock">Stock</Label>
                        <Input
                            required
                            type='number'
                            name="stock"
                            placeholder='Stock...'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="unit">Unit (ml/gr)</Label>
                        <Input
                            required
                            type='text'
                            name="unit"
                            placeholder='unit in ml/gr'
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="volume">Volume</Label>
                        <Input
                            required
                            type='numberr'
                            name="volume"
                            placeholder='Volume...'
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="bottle">Bottle Capacity</Label>
                        <Input
                            required
                            type='number'
                            name="bottle"
                            placeholder='Bottle capacity...'
                            value={bottleCapacity}
                            onChange={(e) => setBottleCapacity(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="buyPrice">Buy price</Label>
                        <Input
                            required
                            type='number'
                            name="buyPrice"
                            placeholder='buy price...'
                            value={buyPrice}
                            onChange={(e) => setBuyPrice(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="sellPrice">Sell price</Label>
                        <Input
                            required
                            type='number'
                            name="sellPrice"
                            placeholder='Sell price...'
                            value={sellPrice}
                            onChange={(e) => setSellPrice(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            required
                            type='text'
                            name="description"
                            placeholder='Description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="categoryId">Category Id</Label>
                        <Input
                            required
                            type='number'
                            name="categoryId"
                            placeholder='Category id ...'
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="sellPrice">Product Image</Label>
                        <input type="file" id="file" required accept=".jpg" onChange={event => {
                            const file = event.target.files[0]
                            setImage(file)
                        }} />
                    </FormGroup>
                </Col>
            </FormGroup>
            <Button color="primary" type='submit' style={{ marginLeft: '15px' }} >Add new product!</Button>
        </Form>

    )
}

export default FormComponent