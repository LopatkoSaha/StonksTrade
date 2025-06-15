import { useParams } from "react-router-dom";
import { useState } from "react";

import "./ChartPage.css";
import { ChartDynamic } from "features/Charts/ChartDynamic";
import { ChartHistory } from "features/Charts/ChartHistory";
import ErrorBoundary from "components/ErrorBoundary";

export const ChartPage = () => {
  const {currency} = useParams();

  const [chartType, setChartType] = useState<"dynamic" | "history">("dynamic");

  const chartToggle = () => {
    setChartType((prev) => {
      if (prev === "dynamic") { 
        return "history";
      } else {
        return "dynamic";
      }

    })
  }

  return (
    <div className="chartPage-wrapper">
      <div className="chartPage-btnToggle">
        <button onClick={chartToggle}>{chartType === "dynamic" ? "12 мес" : "1 день"}</button>
      </div>
      <div className="chartPage-container">
        <ErrorBoundary>
          {chartType === "dynamic" && <ChartDynamic currency={currency ?? ""} />}
          {chartType === "history" && <ChartHistory currency={currency ?? ""} />}
        </ErrorBoundary>
      </div>
    </div>
  );
};

