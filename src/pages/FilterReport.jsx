import { Card, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { DatePicker } from "@material-ui/pickers";
import { RevenueChart } from "../components/RevenueChart";
import { ProfitChart } from "../components/ProfitChart";
import { CostChart } from "../components/CostChart";
import { addDays } from "date-fns";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const FilterReport = () => {
  const [startDate, setStartDate] = useState(addDays(new Date(), -30));
  const [endDate, setEndDate] = useState(new Date());

  let [summary, setSummary] = useState({
    numberOfSales: 0,
    revenue: 0,
    profit: 0,
    cost: 0,
  });

  console.log(JSON.stringify(summary));

  let fetchSummary = async () => {
    try {
      let res = await Axios.get(`${API_URL}/report/get-filter-report`, {
        params: {
          min: startDate,
          max: endDate,
        },
      });
      console.log(res.data);
      setSummary(res.data);
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

  useEffect(() => {
    console.log("Use effect called");
    console.log(startDate);
    console.log(endDate);
    fetchSummary();
  }, [startDate, endDate]);

  return (
    <Container>
      <div
        classNameName="container"
        style={{
          marginTop: "100px",
        }}
      >
        <div className="tabcontent">
          <span style={{color: "#0e4c95", fontWeight: "bold"}}>Select Dates:</span>
          <DatePicker
            style={{ marginLeft: "20px" }}
            disableFuture
            openTo="year"
            format="dd/MM/yyyy"
            label="Start Date"
            views={["year", "month", "date"]}
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            style={{ marginLeft: "20px" }}
            disableFuture
            openTo="year"
            format="dd/MM/yyyy"
            label="End Date"
            views={["year", "month", "date"]}
            value={endDate}
            onChange={setEndDate}
          />
        </div>

        <div className="row mt-5">
          <div className="col-sm fw-3">
            <Card>
              <p className="pb-0 p-3 fw-bold fs-5 text-info">
                Number of Sales:{" "}
              </p>
              <p className="ps-3 fs-5 text-warning">
                {summary.numberOfSales.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          <div className="col-sm">
            <Card>
              <p className="pb-0 p-3 fw-bold fs-5 text-info">Revenue: </p>
              <p className="ps-3 fs-5 text-warning">
                {summary.revenue.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          <div className="col-sm">
            <Card>
              <p className="pb-0 p-3 fw-bold fs-5 text-info">Profit: </p>
              <p className="ps-3 fs-5 text-warning">
                {summary.profit.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          <div className="col-sm">
            <Card>
              <p className="pb-0 p-3 fw-bold fs-5 text-info">Cost: </p>
              <p className="ps-3 fs-5 text-warning">
                {summary.cost.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
        </div>
        <div className="row">
          <div style={{marginTop: "30px", marginBottom: "0px"}}>
            <span style={{marginLeft: "150px",textAlign: "start"}}>in million (Rp)</span><span style={{marginLeft: "290px", textAlign: "center"}}>in million (Rp)</span>
            </div>
          <div className="col-sm">
            <RevenueChart
              startDate={startDate}
              endDate={endDate}
            ></RevenueChart>
          </div>
          <div className="col-sm">
            <ProfitChart startDate={startDate} endDate={endDate}></ProfitChart>
          </div>
          <div className="col-sm">
            <CostChart
              operationalCost={summary.operationalCost}
              fixedCost={summary.fixedCost}
            ></CostChart>
          </div>
        </div>
      </div>
    </Container>
  );
};
