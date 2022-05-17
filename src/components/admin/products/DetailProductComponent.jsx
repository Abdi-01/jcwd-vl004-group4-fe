import React from 'react'
import { Table } from 'reactstrap'
import { API_URL } from '../../../constants/API'

const DetailProductComponent = ({ product }) => {
    return (
        <div>
            <div className="detail-header">
                <h1>{product?.name}</h1>
                {/* <img style={{ width: '200px', marginLeft: "20px" }} src={`${API_URL}/${product?.image}`} /> */}
            </div>
            <Table hover>
                <tbody>
                    <tr>
                        <td width="50px" >1.</td>
                        <td width="150px" ><b>Name</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.name}</td>
                    </tr>
                    <tr>
                        <td width="50px" >2.</td>
                        <td width="150px" ><b>Stock</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.stock}</td>
                    </tr>
                    <tr>
                        <td width="50px" >3.</td>
                        <td width="150px" ><b>Unit</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.unit}</td>
                    </tr>
                    <tr>
                        <td width="50px" >4.</td>
                        <td width="150px" ><b>Volume</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.volume}</td>
                    </tr>
                    <tr>
                        <td width="50px" >5.</td>
                        <td width="150px" ><b>Bootle Capacity</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.bottle_capacity}</td>
                    </tr>
                    <tr>
                        <td width="50px" >6.</td>
                        <td width="150px" ><b>Buy Price</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.buy_price}</td>
                    </tr>
                    <tr>
                        <td width="50px" >7.</td>
                        <td width="150px" ><b>Sell Price</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.sell_price}</td>
                    </tr>
                    <tr>
                        <td width="50px" >8.</td>
                        <td width="150px" ><b>Description</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.description}</td>
                    </tr>
                    <tr>
                        <td width="50px" >9.</td>
                        <td width="150px" ><b>Category</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td >{product?.category.name}</td>
                    </tr>
                    <tr>
                        <td width="50px" >10.</td>
                        <td width="150px" ><b>Image</b></td>
                        <td width="10px" ><b>:</b></td>
                        <td width="10px" >
                            <img src={`${API_URL}/${product?.image}`} style={{ width: '200px', height: "200px" }} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DetailProductComponent