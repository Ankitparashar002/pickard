import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./TrafficCard.module.css";
import API_BASE_URL from "../../../../../api/apiConfig";

Chart.register(...registerables);

const TrafficCard = ({ startDate, endDate, title, apiEnagagementReport }) => {
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

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.acquiringText}>Acquiring...</p>
      </div>
    );
  }
  if (error) {
    return <div className={styles.error}></div>;
  }

  // Destructure the values from pagesData for clarity
  const { current, previousPeriod, previousYear } = pagesData;

  // Function to aggregate sessions if data is an array
  const calculateTotalSessions = (data) => {
    if (Array.isArray(data)) {
      return data.reduce((total, item) => total + (item.sessions || 0), 0);
    }
    return data;
  };

  const mainNumber = calculateTotalSessions(current);
  const previousPeriodValue = calculateTotalSessions(previousPeriod);
  const previousYearValue = calculateTotalSessions(previousYear);

  // Determine the title to display:
  // If API provides a channelGroup in the current data, use that as title; otherwise, use the passed in title prop.
  const cardTitle =
    Array.isArray(current) && current.length > 0 && current[0].channelGroup
      ? current[0].channelGroup
      : title;

  // The chart data remains the same if you don't need to update it
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Sessions",
        data: [400, 410, 400, 414, 415],
        borderColor: "#53682d",
        backgroundColor: "rgba(62, 84, 29, 0.34)",
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointRadius: 0, // No normal points
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false, // tooltip shows when hovering near the line, not just on a point
    },
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
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        {/* Title: Use channelGroup from API if available; otherwise, use prop title */}
        <p className={styles.title}>{cardTitle}</p>

        {/* Main Number from API */}
        <h2 className={styles.mainNumber}>{mainNumber}</h2>

        {/* Mini-chart container */}
        <div className={styles.chartContainer}>
          <Line data={data} options={options} />
        </div>

        {/* Previous info */}
        <div className={styles.previousInfo}>
          <span>
            Previous period <strong>{previousPeriodValue}</strong>
          </span>
          <span>
            Previous year{" "}
            <strong className="text-end">{previousYearValue}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrafficCard;
