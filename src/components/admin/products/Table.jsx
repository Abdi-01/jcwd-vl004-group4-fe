import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../../constants/API';
import axios from 'axios'
import swal from 'sweetalert';
import './Table.css'

const { SearchBar } = Search

const Table = () => {

    const navigate = useNavigate()

    const deleteHandler = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${API_URL}/products/delete-product/${id}`)
                        .then(response => {
                            swal(`Poof! ${response.data.message}`, {
                                icon: "success",
                            });
                            navigate('/admin/products')
                        })
                        .catch(error => console.log(error))
                } else {
                    swal("Your data is safe!");
                }
            });
    }

    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    }, {
        dataField: 'name',
        text: 'Name',
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    }, {
        dataField: 'stock',
        text: 'Stock',
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    },
    {
        dataField: 'unit',
        text: "Unit",
    },
    {
        dataField: 'volume',
        text: "Volume",
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    },
    {
        dataField: 'bottle_capacity',
        text: "Bottle Capacity",
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    },
    {
        dataField: 'buy_price',
        text: "Buy price",
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    },
    {
        dataField: 'sell_price',
        text: "Sell price",
        sort: 'true',
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-up-circle-outline"></ion-icon><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;<ion-icon size="small" name="arrow-down-circle-outline"></ion-icon><font color="blue"><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="blue"><ion-icon size="small" name="arrow-down-circle-outline"></ion-icon></font><ion-icon size="small" name="arrow-up-circle-outline"></ion-icon></span>);
            return null;
        }
    },
    {
        dataField: "link",
        text: "Action",
        formatter: (rowContent, row) => {
            return (
                <div>
                    <Link to={"/admin/product-edit/" + row.id} >
                        <Button color='info' size='sm' style={{ margin: "10px" }}>
                            <ion-icon name="create-outline"></ion-icon>
                        </Button>
                    </Link>
                    <Link to={"/admin/product-detail/" + row.id} >
                        <Button color='secondary' size='sm' >
                            <ion-icon name="bulb-outline"></ion-icon>
                        </Button>
                    </Link>
                    <Button color='danger' size='sm' style={{ margin: "10px" }} onClick={() => deleteHandler(row.id)} >
                        <ion-icon name="trash-outline"></ion-icon>
                    </Button>
                </div>
            )
        }
    }];



    const [products, setProducts] = useState([])
    const admin = useSelector(state => state.authAdminlogin)

    // fetching product from API
    useEffect(() => {
        axios.get(`${API_URL}/products/all-products`)
            .then(response => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch(error => console.log(error.message))
    }, [admin])

    return (
        < div className='outer-container' >
            <div className="inner-container">
                {products ? <ToolkitProvider
                    keyField="id"
                    data={products}
                    columns={columns}
                    search
                    striped
                    hover
                    condensed
                >
                    {
                        props => (
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', width: '100%', marginTop: '90px' }} >
                                    <div>
                                        <Link to="/admin/filter-report" >
                                            <Button color='light' size='lg' >
                                                <ion-icon name="chevron-back-circle-outline" size="large" ></ion-icon>
                                            </Button>
                                        </Link>
                                        <Link to="/admin/add-product" >
                                            <Button color='primary' size='lg' style={{ marginLeft: '13px' }} >
                                                <ion-icon name="pricetags-outline" size="small" ></ion-icon>
                                                <ion-icon name="add-circle-outline" size="small" ></ion-icon>
                                            </Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <SearchBar {...props.searchProps} placeholder="search..." />
                                    </div>
                                </div>
                                <hr />
                                <BootstrapTable
                                    pagination={paginationFactory()}
                                    {...props.baseProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider> : null}
            </div>
        </ div>
    )
}

export default Table