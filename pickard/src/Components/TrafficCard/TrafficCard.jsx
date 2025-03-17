import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./TrafficCard.module.css";

Chart.register(...registerables);

const TrafficCard = ({ startDate, endDate, title, apiEnagagementReport }) => {
  const [pagesData, setPagesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format dates for API request (YYYY-MM-DD)
  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];

  const baseUrl = "https://localhost:7050/api";
  const url = `${baseUrl}/${apiEnagagementReport.apiurl}/${apiEnagagementReport.url}?StartDate=${formattedStart}&EndDate=${formattedEnd}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        if (result.success) {
          // Save the data from the API directly
          setPagesData(result.data);
        } else {
          throw new Error(result.message || "API returned unsuccessful");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Optionally, handle loading or error states.
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Destructure the values from pagesData for clarity
  const {
    current,
    previousPeriod,
    previousYear,
    currentPagesPerSession,
    previousPeriodPagesPerSession,
    previousYearPagesPerSession,
  } = pagesData;

  // The chart data remains the same if you don't need to update it
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Sessions",
        data: [400, 410, 400, 414, 415],
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
          stepSize: 300,
          display: false,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        {/* Title */}
        <p className={styles.title}>{title}</p>

        {/* Main Number from API */}
        <h2 className={styles.mainNumber}>{current}</h2>

        {/* Mini-chart container */}
        <div className={styles.chartContainer}>
          <Line data={data} options={options} />
        </div>

        {/* Previous info */}
        <div className={styles.previousInfo}>
          <span>
            Previous period <strong>{previousPeriod}</strong>
          </span>
          <span>
            Previous year <strong className="text-end">{previousYear}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrafficCard;
