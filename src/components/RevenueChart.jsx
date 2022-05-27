import React, { useEffect, useState } from "react";
import Axios from "axios";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import {
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";
import { API_URL } from "../constants/API";

export const RevenueChart = (props) => {
  console.log(props);

  let [data, setData] = useState([]);

  let fetchRevenue = async () => {
    try {
      let res = await Axios.get(
        API_URL+"/report/get-revenue-chart",
        {
          params: {
            min: props.startDate,
            max: props.endDate,
          },
        }
      );
      console.log(res.data);
      setData(res.data);
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
    fetchRevenue();
  }, [props]);

  return (
    <div>
      <VictoryChart
        scale={{ x: "time" }}
        domainPadding={10}
        // domainPadding={{x: [20, 0]}}
        theme={VictoryTheme.material}
      >
        <VictoryAxis label="" />
        <VictoryAxis dependentAxis />
        <VictoryStack colorScale={"blue"}>
          <VictoryArea
            interpolation="cardinal"
            data={data}
            x={(d) => new Date(d.date)}
            y={(d) => d.revenue / 1000000}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};
