import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AnanlyticsGraph.module.css";

Chart.register(...registerables);

const AnanlyticsGraph = () => {
  const data = {
    labels: [
      "Feb 01 - Feb 02",
      "Feb 03 - Feb 09",
      "Feb 10 - Feb 16",
      "Feb 17 - Feb 23",
    ],
    datasets: [
      {
        label: "Sessions",
        data: [500, 2300, 2200, 2400, 2000],
        borderColor: "#3F582B",
        backgroundColor: "rgba(143, 160, 108, 0.3)", // Light green shade
        fill: true,
        tension: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3000,
        ticks: {
          stepSize: 750, // Adjust for better readability
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
    },
  };

  return (
    <div className={`${style.chart_container}`}>
      <div className={`${style.header}`}>
        <h4>ACQUISITION</h4>
      </div>
      <div className={`${style.chart_box}`}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AnanlyticsGraph;
