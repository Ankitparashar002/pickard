import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AnanlyticsGraph.module.css";

Chart.register(...registerables);

const AnanlyticsGraph = ({ startDate, endDate, geturl, url }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://localhost:7050/api";
        const response = await fetch(
          `${baseUrl}/${geturl}/${url}?StartDate=${formattedStart}&EndDate=${formattedEnd}`
        );
        const result = await response.json();

        if (result.success) {
          // If API returns nested object format
          if (result.data.isSuccess && result.data.sessionsByDate) {
            const sessionsByDate = result.data.sessionsByDate;
            const labels = Object.keys(sessionsByDate).map((dateStr) => {
              // If the date is in YYYY-MM-DD, convert to "MMM DD" (e.g., "Feb 25")
              if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                const dateObj = new Date(dateStr);
                return dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }
              return dateStr;
            });
            const data = Object.values(sessionsByDate);
            setChartData({
              labels,
              datasets: [
                {
                  label: "Sessions",
                  data,
                  borderColor: "#3F582B",
                  backgroundColor: "rgba(143, 160, 108, 0.3)",
                  fill: true,
                  tension: 0,
                  borderWidth: 2,
                  pointRadius: 0,
                  pointHoverRadius: 0,
                },
              ],
            });
          }
          // If API returns an array of objects
          else if (Array.isArray(result.data)) {
            const sessions = result.data;
            // Determine whether to use the "sessions" or "users" key for the values
            const sessionKey =
              sessions[0]?.sessions !== undefined ? "sessions" : "users";

            // Helper function to format the date string
            const formatDate = (dateStr) => {
              // If the date is an 8-digit number like "20250225", assume it's in YYYYMMDD format
              if (/^\d{8}$/.test(dateStr)) {
                const year = dateStr.substring(0, 4);
                const month = dateStr.substring(4, 6);
                const day = dateStr.substring(6, 8);
                const dateObj = new Date(year, parseInt(month) - 1, day);
                return dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }
              // Otherwise, try parsing the date. If it fails, return the original string.
              const parsed = Date.parse(dateStr);
              if (!isNaN(parsed)) {
                const dateObj = new Date(parsed);
                return dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }
              return dateStr;
            };

            const labels = sessions.map((item) => formatDate(item.date));
            const data = sessions.map((item) => item[sessionKey]);
            setChartData({
              labels,
              datasets: [
                {
                  label: "Sessions",
                  data,
                  borderColor: "#3F582B",
                  backgroundColor: "rgba(143, 160, 108, 0.3)",
                  fill: true,
                  tension: 0,
                  borderWidth: 2,
                  pointRadius: 0,
                  pointHoverRadius: 0,
                },
              ],
            });
          } else {
            console.error("Unexpected API data structure:", result.data);
          }
        } else {
          console.error("API error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formattedStart, formattedEnd, geturl, url]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
        ticks: {
          stepSize: 5,
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

  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <div className={style.spinner}></div>
        <p className={style.acquiringText}>Acquiring...</p>
      </div>
    );
  }

  return (
    <div className={`${style.chart_container}`}>
      <div className={`${style.chart_box}`}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AnanlyticsGraph;
