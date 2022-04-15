import React from "react";
import "./product.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";

const ProductAdmin = () => {
  const rows = [
    {
      id: 1,
      name: "paracetamol",
      stock: 100,
      unit: "gram",
      volume: 10000,
      buy_price: 5000,
      sell_price: 8000,
      description: "lorem ipsum",
      category: "tablet",
      image:
        "https://images.k24klik.com/product/large/apotek_online_k24klik_20210624013902359225_paracetamol-triman.jpg",
    },
  ];
  return (
    <div className="products">
      <Sidebar />
      <div className="productsContainer">
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Stock</TableCell>
                <TableCell className="tableCell">Unit</TableCell>
                <TableCell className="tableCell">Volume</TableCell>
                <TableCell className="tableCell">Buy Price</TableCell>
                <TableCell className="tableCell">Sell Price</TableCell>
                <TableCell className="tableCell">Description</TableCell>
                <TableCell className="tableCell">Category</TableCell>
                <TableCell className="tableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.image} alt="" className="image" />
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{row.stock}</TableCell>
                  <TableCell className="tableCell">{row.unit}</TableCell>
                  <TableCell className="tableCell">{row.volume}</TableCell>
                  <TableCell className="tableCell">{row.buy_price}</TableCell>
                  <TableCell className="tableCell">{row.sell_price}</TableCell>
                  <TableCell className="tableCell">{row.description}</TableCell>
                  <TableCell className="tableCell">{row.category}</TableCell>
                  <TableCell className="tableCell">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProductAdmin;
