import React from "react";
import {
  VictoryPie,
} from "victory";

export const CostChart = (props) => {

  console.log(props)

  return (
    <div>
      <VictoryPie padding={{right: 100, left: 55}} colorScale="blue" 
        data={[
          { x: "Operational", y: props.operationalCost },
          { x: "Fixed", y: props.fixedCost },
        ]}
      />
    </div>
  );
};
