import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./OrganicCards.module.css";
import API_BASE_URL from "../../../../../api/apiConfig";

Chart.register(...registerables);

const OrganicCards = ({ startDate, endDate, title, apiEnagagementReport }) => {
  const [pagesData, setPagesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format dates for API request (YYYY-MM-DD)
  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];

  const url = `${API_BASE_URL}/${apiEnagagementReport.apiurl}/${apiEnagagementReport.url}?StartDate=${formattedStart}&EndDate=${formattedEnd}`;

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

  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <div className={style.spinner}></div>
        <p className={style.acquiringText}>Acquiring...</p>
      </div>
    );
  }
  if (error) {
    return <div className={style.error}></div>;
  }

  // Assume your API returns a `current` value for the main number
  const { current } = pagesData;

  // Example chart data; replace with real data if needed
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Sessions",
        data: [400, 700, 400, 800, 415],
        borderColor: "#53682d",
        backgroundColor: "rgba(83, 104, 45, 0.3)",
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointRadius: 0, // No normal points
        pointHoverRadius: 0,
      },
    ],
  };

  // Chart options to hide axes & baseline
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false, // tooltip shows when hovering near the line, not just on a point
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label || "",
          label: (tooltipItem) =>
            `Sessions: ${tooltipItem.parsed.y.toLocaleString()}`,
        },
      },
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
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        border: {
          display: false,
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
    <div className={style.cardContainer}>
      <div className={style.cardBody}>
        {/* Title */}
        <p className={style.title}>{title}</p>

        {/* Main Number from API */}
        <h2 className={style.mainNumber}>{current}</h2>

        {/* Mini-chart container */}
        <div className={style.chartContainer}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OrganicCards;
