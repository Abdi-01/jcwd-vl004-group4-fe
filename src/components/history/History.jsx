import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./history.scss";

const History = () => {
  const rows = [
    {
      id: 1,
      product: "Paracetamol",
      img: "https://images.k24klik.com/product/large/apotek_online_k24klik_20210624013902359225_paracetamol-triman.jpg",
      date_time: "28 April 2022 - 23:32",
      amount: 785,
      price: 600000,
      status: "Pending",
    },
    {
      id: 2,
      product: "Lisinopril",
      img: "https://d2qjkwm11akmwu.cloudfront.net/products/210210_15-7-2019_9-47-34.jpgjpg",
      date_time: "23 February 2022 - 19:32",
      amount: 105,
      price: 750000,
      status: "Approved",
    },
    {
      id: 3,
      product: "Omeprazole",
      img: "https://d2qjkwm11akmwu.cloudfront.net/products/825426_4-11-2020_10-29-21.jpeg",
      date_time: "9 February 2022 - 16:26",
      amount: 87,
      price: 443000,
      status: "Approved",
    },
    {
      id: 4,
      product: "Meloxicam",
      img: "https://static.hdmall.id/750x450/system/image_attachments/images/000/001/338/original/meloxicam-15-mg-strip-otto-1.jpg",
      date_time: "13 January 2022 - 23:32",
      amount: 97,
      price: 367000,
      status: "Approved",
    },
    {
      id: 5,
      product: "Carvedilol",
      img: "https://d2qjkwm11akmwu.cloudfront.net/products/292762_19-3-2021_16-47-9.jpeg",
      date_time: "2 January 2022 - 20:12",
      amount: 354,
      price: 880500,
      status: "Approved",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Invoice ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Total Amount</TableCell>
            <TableCell className="tableCell">Total Price</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.date_time}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default History;
