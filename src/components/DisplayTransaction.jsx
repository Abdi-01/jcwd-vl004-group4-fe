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

  const buttonHandler = (is_confirmed, row) => {
    swal
      .fire({
        title: `Are you sure you want to ${
          is_confirmed ? "approve" : "reject"
        }?`,
        icon: "warning",
        confirmButtonText: "Yes",
        showConfirmButton: true,
        showCancelButton: true,
      })
      .then(async (swalRes) => {
        if (!swalRes.isConfirmed) return;

        try {
          let res = await Axios.post(
            `${API_URL}/transaction/update-transaction`,
            {
              headerId: row.id,
              is_confirmed: is_confirmed,
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("token_shutter_admin")
                )}`,
              },
            }
          );
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
      });
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
            style={{ padding: "0" }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {transaction.invoice_code}
        </TableCell>
        <TableCell align="center">
          {transaction.shipping_price.toLocaleString("id-ID")}
        </TableCell>
        <TableCell align="center">
          {transaction.total_price.toLocaleString("id-ID")}
        </TableCell>
        <TableCell align="center">{transaction.createdAt}</TableCell>
        <TableCell align="center">{transaction.user.username}</TableCell>
        <TableCell align="center">
          {transaction.payment_confirmation.admin?.username}
        </TableCell>
        <TableCell>
          <Image
            src={
              API_URL + transaction.payment_confirmation.image
            }
          />
        </TableCell>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
          }}
        >
          <Button
            style={{ padding: 5 }}
            variant="contained"
            color="success"
            onClick={() => buttonHandler(true, transaction)}
          >
            Approve
          </Button>
          <Button
            style={{ padding: 5 }}
            variant="contained"
            color="error"
            onClick={() => buttonHandler(false, transaction)}
          >
            Reject
          </Button>
        </div>
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
                    <TableCell />
                    <TableCell align="center" className="fw-bold">
                      Product Name
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Bottle Capacity
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Quantity
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction.invoice_details.map((dtls) => (
                    <TableRow key={dtls.id}>
                      <TableCell />
                      <TableCell align="center" component="th" scope="row">
                        {dtls.product.name}
                      </TableCell>
                      <TableCell align="center">
                        {dtls.product.bottle_capacity}
                      </TableCell>
                      <TableCell align="center">{dtls.qty}</TableCell>
                      <TableCell align="center">
                        {dtls.price.toLocaleString("id-ID")}
                      </TableCell>
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
            <TableCell align="center" className="fs-6 fw-bold">
              Invoice Code
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              Shipping Price
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              Total Price
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              Created Date
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              User
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              Admin
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              Image
            </TableCell>
            <TableCell align="center" className="fs-6 fw-bold">
              Confirmation
            </TableCell>
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
