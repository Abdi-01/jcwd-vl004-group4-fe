import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.invoice_code}
        </TableCell>
        <TableCell align="center">
          {row.shipping_price.toLocaleString("id-ID")}
        </TableCell>
        <TableCell align="center">
          {row.total_price.toLocaleString("id-ID")}
        </TableCell>
        <TableCell align="center">{row.createdAt}</TableCell>
        <TableCell align="center">{row.user.username}</TableCell>
        <TableCell align="center">{row.admin.username}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className="fw-bold"
              >
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center" className="fw-bold">Product Name</TableCell>
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
                  {row.invoice_details.map((dtls) => (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
