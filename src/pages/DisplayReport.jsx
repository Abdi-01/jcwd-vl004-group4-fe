import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import CollapsibleTable from "../components/DisplayReport";
import { useSearchParams } from "react-router-dom";
import { Container, Stack, Pagination } from "@mui/material";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useSelector } from "react-redux";

const DisplayReport = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [invoices, setInvoices] = useState([]);
  let [page, setPage] = useState(1);
  const admin = useSelector((state) => state.authAdminLogin);

  let fetchInvoices = async () => {
    if (!admin.id) return;
    try {
      let res = await Axios.get(`${API_URL}/report/get-display-report`, {
        params: {
          offset: searchParams.get("offset"),
          adminId: admin.id,
        },
      });
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

  let setOffset = (offset) => {
    console.log(offset);
    searchParams.set("offset", offset);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    console.log("Use effect called");
    fetchInvoices();
  }, [searchParams, admin]);

  return (
    <Container style={{ marginTop: "60px" }}>
      <CollapsibleTable rows={invoices}></CollapsibleTable>
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

export default DisplayReport;
