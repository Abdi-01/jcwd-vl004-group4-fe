import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import CollapsibleTable from "../components/DisplayTransaction";
import { useSearchParams } from "react-router-dom";
import { Container, Stack, Pagination } from "@mui/material";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useSelector } from "react-redux";
import { DatePicker } from "@material-ui/pickers";
import { addDays } from "date-fns";

const DisplayTransaction = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [invoices, setInvoices] = useState([]);
  let [page, setPage] = useState(1);
  const admin = useSelector((state) => state.authAdminLogin);
  const [startDate, setStartDate] = useState(addDays(new Date(), -30));
  const [endDate, setEndDate] = useState(new Date());

  console.log(admin);

  let fetchInvoices = async () => {
    if (!admin.id) return;
    try {
      console.log(startDate, endDate);
      let res = await Axios.get(
        `${API_URL}/transaction/get-display-transaction`,
        {
          params: {
            offset: searchParams.get("offset"),
            adminId: admin.id,
            min: startDate,
            max: endDate,
          },
        }
      );
      console.log(res.data);
      setInvoices(res.data.items);
      setPage(res.data.pageCount);
    } catch (e) {
      console.log(e);
      swal.fire({
        title: "There is some mistake in server",
        icon: "warning",
        confirm: true,
      });
      return;
    }
  };

  let paginationHandler = (page) => {
    console.log(page);
    let offset = (page - 1) * 10; // 10 is limit
    setOffset(offset);
  };

  let startDateHandler = (date) => {
    setStartDate(date);
    setPage(1);
  };
  let endDateHandler = (date) => {
    setEndDate(date);
    setPage(1);
  };

  let setOffset = (offset) => {
    console.log(offset);
    searchParams.set("offset", offset);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    console.log("Use effect called");
    fetchInvoices();
  }, [searchParams, admin, startDate, endDate]);

  return (
    <Container style={{ marginTop: "60px" }}>
      <div className="tabcontent">
        <span style={{ color: "#0e4c95", fontWeight: "bold" }}>
          Select Dates:
        </span>
        <DatePicker
          style={{ marginLeft: "20px" }}
          disableFuture
          openTo="year"
          format="yyyy-MM-dd"
          label="Start Date"
          views={["year", "month", "date"]}
          value={startDate}
          onChange={startDateHandler}
        />
        <DatePicker
          style={{ marginLeft: "20px" }}
          disableFuture
          openTo="year"
          format="yyyy-MM-dd"
          label="End Date"
          views={["year", "month", "date"]}
          value={endDate}
          onChange={endDateHandler}
        />
      </div>

      <CollapsibleTable
        rows={invoices}
        refreshData={fetchInvoices}
      ></CollapsibleTable>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <Pagination
          count={page}
          variant="outlined"
          siblingCount={1}
          shape="rounded"
          onChange={(ev, page) => paginationHandler(page)}
        />
      </Stack>
    </Container>
  );
};

export default DisplayTransaction;
