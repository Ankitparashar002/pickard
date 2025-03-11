import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./TrafficCard.module.css";

Chart.register(...registerables);

const TrafficCard = () => {
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Sessions",
        data: [100, 400, 500, 600, 700],
        borderColor: "#3F582B",
        backgroundColor: "rgba(143, 160, 108, 0.3)",
        fill: true,
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 300, // You can keep stepSize if needed for grid spacing
          display: false, // Hides the y-axis numbers
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
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        {/* Title */}
        <p className={styles.title}>Organic</p>

        {/* Main Number */}
        <h2 className={styles.mainNumber}>5,465</h2>

        {/* Mini-chart container */}
        <div className={styles.chartContainer}>
          <Line data={data} options={options} />
        </div>

        {/* Previous info */}
        <div className={styles.previousInfo}>
          <span>
            Previous period <strong>5,432</strong>
          </span>
          <span>
            Previous year <strong>4,919</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrafficCard;
