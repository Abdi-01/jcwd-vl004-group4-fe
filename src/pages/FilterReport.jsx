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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/sidebar/Sidebar";

const FilterReport = () => {
  const [startDate, setStartDate] = useState(addDays(new Date(), -30));
  const [endDate, setEndDate] = useState(new Date());
  const admin = useSelector((state) => state.authAdminLogin);
  const navigate = useNavigate();

  let [summary, setSummary] = useState({
    numberOfSales: 0,
    revenue: 0,
    profit: 0,
    cost: 0,
    topProducts: [],
  });

  console.log(JSON.stringify(summary));

  let fetchSummary = async () => {
    if (!localStorage.getItem("token_shutter_admin")) {
      console.log("null admin token");
      swal
        .fire({
          title: "You don't have access to this page",
          icon: "warning",
          confirm: true,
        })
        .then(() => {
          navigate("/");
        });
      return;
    }

    try {
      let res = await Axios.get(`${API_URL}/report/get-filter-report`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token_shutter_admin")
          )}`,
        },
        params: {
          min: startDate,
          max: endDate,
          adminId: admin.id,
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
    if (startDate > endDate) {
      swal.fire({
        title: "End date should be greater than start date",
        icon: "warning",
        confirm: true,
      });
      return;
    } else {
      fetchSummary();
    }
  }, [startDate, endDate]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Sidebar />
      <div
        style={{
          marginTop: "70px",
          display: admin.id ? "block" : "none",
          flex: 6,
        }}
      >
        <div className="tabcontent">
          <span
            style={{ color: "#0e4c95", fontWeight: "bold", marginLeft: "10px" }}
          >
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
            onChange={setStartDate}
          />
          <DatePicker
            style={{ marginLeft: "20px" }}
            disableFuture
            openTo="year"
            format="yyyy-MM-dd"
            label="End Date"
            views={["year", "month", "date"]}
            value={endDate}
            onChange={setEndDate}
          />
        </div>

        <div className="row m-5">
          <div className="col-sm fw-3 ">
            <Card>
              <p className="pb-3 p-3 fw-bold fs-5 text-info">
                Number of Sales:{" "}
              </p>
              <p className="ps-3 pb-5 fs-5 text-warning">
                {summary.numberOfSales.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          
          <div className="col-sm">
            <Card>
              <p className="pb-3 p-3 fw-bold fs-5 text-info">Revenue: </p>
              <p className="ps-3 pb-5 fs-5 text-warning">
                {summary.revenue.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          <div className="col-sm">
            <Card>
              <p className="pb-3 p-3 fw-bold fs-5 text-info">Profit: </p>
              <p className="ps-3 pb-5 fs-5 text-warning">
                {summary.profit.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          <div className="col-sm">
            <Card>
              <p className="pb-3 p-3 fw-bold fs-5 text-info">Cost: </p>
              <p className="ps-3 pb-5 fs-5 text-warning">
                {summary.cost.toLocaleString("id-ID")}
              </p>
            </Card>
          </div>
          <div className="col-sm fw-3 ">
            <Card>
              <p className="pb-0 p-3 fw-bold fs-5 text-info">
                Top 3 Products:{" "}
              </p>
              <p className="ps-2 fs-5 pl-0 text-warning">
                <ol>
                  {summary.topProducts.map((prd) => {
                    return <li>{prd.name}</li>;
                  })}
                </ol>
              </p>
            </Card>
          </div>
        </div>
        <div className="row">
          <div style={{ fontWeight: "bold", color: "#23cde8" }}>
            <span
              style={{
                marginLeft: "130px",
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              Revenue in Million (Rp)
            </span>
            <span
              style={{
                marginLeft: "260px",
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              Profit in Million (Rp)
            </span>
            <span
              style={{
                marginLeft: "260px",
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              Costs Proportion
            </span>
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
    </div>
  );
};

export default FilterReport;
