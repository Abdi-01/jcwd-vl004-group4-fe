import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "styled-components";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Image = styled.img`
  height: 75px;
  z-index: 2;
`;

function Row(props) {
  const { transaction } = props;
  const [open, setOpen] = React.useState(false);
  const admin = useSelector((state) => state.authAdminLogin);

  const buttonHandler = async (is_confirmed, row) => {
    try {
      let res = await Axios.post(`${API_URL}/transaction/update-transaction`, {
        headerId: row.id,
        is_confirmed: is_confirmed,
        adminId: admin.id,
      });
      props.refreshData();
    } catch (e) {
      console.log(e.message);
      swal.fire({
        title: "There is some mistake in server",
        icon: "warning",
        confirm: true,
      });
      return;
    }
  };

  let getColor = (transaction) => {
    // if not approved/rejected then return white
    if (!transaction.payment_confirmation.adminId) return "#fff";
    //if confirmed then return green
    else if (transaction.payment_confirmation.is_confirmed) return "#dfd";
    // else return red
    else return "#fdd";
  };


  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={{
          backgroundColor: getColor(transaction),
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {transaction.invoice_code}
        </TableCell>
        <TableCell align="right">{transaction.shipping_price}</TableCell>
        <TableCell align="right">{transaction.total_price}</TableCell>
        <TableCell align="right">{transaction.createdAt}</TableCell>
        <TableCell align="right">{transaction.user.username}</TableCell>
        <TableCell align="right">{transaction.admin.username}</TableCell>
        <TableCell>
          <Image
            src={
              "http://localhost:5000/" + transaction.payment_confirmation.image
            }
          />
        </TableCell>
        <Button onClick={() => buttonHandler(true, transaction)}>
          Approve
        </Button>
        <Button onClick={() => buttonHandler(false, transaction)}>
          Reject
        </Button>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Bottle Capacity</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction.invoice_details.map((dtls) => (
                    <TableRow key={dtls.id}>
                      <TableCell component="th" scope="row">
                        {dtls.product.name}
                      </TableCell>
                      <TableCell>{dtls.product.bottle_capacity}</TableCell>
                      <TableCell align="right">{dtls.qty}</TableCell>
                      <TableCell align="right">{dtls.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  let rows = [];
  if (props.rows) rows = props.rows;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Invoice Code</TableCell>
            <TableCell align="right">Shipping Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Confirmation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((transaction) => (
            <Row
              key={transaction.id}
              transaction={transaction}
              refreshData={props.refreshData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
