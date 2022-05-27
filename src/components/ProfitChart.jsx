import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Axios from "axios";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";

export const ProfitChart = (props) => {
  console.log(props);

  let [data, setData] = useState([]);

  let fetchProfit = async () => {
    try {
      let res = await Axios.get(
        "http://localhost:5000/report/get-profit-chart",
        {
          params: {
            min: props.startDate,
            max: props.endDate,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token_shutter_admin")
            )}`,
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
    fetchProfit();
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
          <VictoryBar
            data={data}
            x={(d) => new Date(d.date)}
            y={(d) => d.profit / 1000000}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};
