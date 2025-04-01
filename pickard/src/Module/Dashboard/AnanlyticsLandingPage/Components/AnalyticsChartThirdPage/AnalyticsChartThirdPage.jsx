import React, { useRef, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AnalyticsChartThirdPage.module.css";
import API_BASE_URL from "../../../../../api/apiConfig";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsChartThirdPage = ({
  startDate,
  endDate,
  title,
  apiEndPoint,
}) => {
  const [queriesData, setQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format dates for API request (YYYY-MM-DD)
  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];

  const url = `${API_BASE_URL}/${apiEndPoint.apiurl}/${apiEndPoint.url}?StartDate=${formattedStart}&EndDate=${formattedEnd}`;

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
          let formattedData = [];
          // Handle the case when data is an array
          if (Array.isArray(result.data)) {
            formattedData = result.data.map((item) => {
              // Check if item contains expected keys (e.g. channelGroup and sessions)
              if (item.channelGroup && item.sessions !== undefined) {
                return {
                  label: item.channelGroup,
                  clicks: parseInt(item.sessions, 10),
                };
              } else {
                // Fallback: use first key/value from the object
                const key = Object.keys(item)[0];
                return {
                  label: key,
                  clicks: parseInt(item[key], 10),
                };
              }
            });
          }
          // Handle the case when data is an object (key/value pairs)
          else if (typeof result.data === "object" && result.data !== null) {
            formattedData = Object.entries(result.data).map(([key, value]) => ({
              label: key,
              clicks: parseInt(value, 10),
            }));
          }

          // Sort the data in descending order by clicks
          formattedData.sort((a, b) => b.clicks - a.clicks);

          // Retrieve colors from CSS variables
          const colorVariables = [
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color1")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color2")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color3")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color4")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color5")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color6")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color7")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color8")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color9")
              .trim(),
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color10")
              .trim(),
          ];

          // Assign colors after sorting so that the largest values get the first colors
          formattedData = formattedData.map((item, index) => ({
            ...item,
            color: colorVariables[index % colorVariables.length],
          }));

          setQueriesData(formattedData);
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
  }, [url, formattedStart, formattedEnd]);

  // Calculate total clicks
  const totalClicks = queriesData.reduce((sum, item) => sum + item.clicks, 0);

  // State to highlight the active table row
  const [activeRow, setActiveRow] = useState(null);

  // Prepare data for the donut chart
  const chartData = {
    labels: queriesData.map((item) => item.label),
    datasets: [
      {
        data: queriesData.map((item) => item.clicks),
        backgroundColor: queriesData.map((item) => item.color),
        hoverBackgroundColor: queriesData.map((item) => item.color),
      },
    ],
  };

  // Chart options including custom tooltip callback and onHover event
  const chartOptions = {
    responsive: true,
    cutout: "50%", // donut hole
    onHover: (event, elements) => {
      if (elements.length > 0) {
        const idx = elements[0].index;
        setActiveRow(idx);
      } else {
        setActiveRow(null);
      }
    },
    plugins: {
      legend: {
        display: false, // we'll use our table as the legend
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = totalClicks
              ? ((value / totalClicks) * 100).toFixed(1)
              : 0;
            return [` ${value}`, `(${percentage}%)`];
          },
        },
      },
    },
  };

  // Reference to the Chart.js instance
  const chartRef = useRef(null);

  // Handler when hovering over a table row
  const handleMouseEnterLabel = (dataIndex) => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    // Get the slice position so tooltip appears near it
    const meta = chart.getDatasetMeta(0).data[dataIndex];
    const { x, y } = meta.getProps(["x", "y"], true);

    // Activate the slice and show tooltip programmatically
    chart.setActiveElements([{ datasetIndex: 0, index: dataIndex }]);
    chart.tooltip.setActiveElements([{ datasetIndex: 0, index: dataIndex }], {
      x,
      y,
    });
    chart.update();

    // Highlight the table row
    setActiveRow(dataIndex);
  };

  // Handler when mouse leaves a table row
  const handleMouseLeaveLabel = () => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    // Clear active elements and tooltip
    chart.setActiveElements([]);
    chart.tooltip.setActiveElements([]);
    chart.update();

    // Remove table row highlight
    setActiveRow(null);
  };

  // Render loading, error, or chart
  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <div className={style.spinner}></div>
        <p className={style.acquiringText}>Acquiring...</p>
      </div>
    );
  }

  if (!queriesData.length) return <p style={{ margin: "0px" }}></p>;

  return (
    <div className={`container ${style.analytic_chart}`}>
      <div className="container">
        <div className={`${style.analytic_Table} row`}>
          <p
            className={`text-muted mt-3 m-0 ${style.analytic_Table_sub_heading}`}
          >
            {title.toUpperCase()}
          </p>
          {/* Left column: Donut Chart */}
          <div
            className={`${style.doughnut_chart} col-md-3 d-flex justify-content-center align-items-center `}
          >
            <div style={{ width: "170px", height: "170px" }}>
              <Doughnut
                ref={chartRef}
                data={chartData}
                options={chartOptions}
              />
            </div>
          </div>
          {/* Right column: Table */}
          <div className="col-md-9 mainDiv">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th className="w-50 border-bottom-0">Queries</th>
                  <th className="w-50 text-end border-bottom-0">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {queriesData.map((item, idx) => {
                  const percentage = totalClicks
                    ? ((item.clicks / totalClicks) * 100).toFixed(1)
                    : 0;
                  return (
                    <tr
                      key={idx}
                      onMouseEnter={() => handleMouseEnterLabel(idx)}
                      onMouseLeave={handleMouseLeaveLabel}
                      className={activeRow === idx ? "table-primary" : ""}
                    >
                      <td className="p-0 border-bottom-0 ps-2">
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            marginRight: "8px",
                          }}
                        ></span>
                        <span className={style.item_label}>{item.label}</span>
                      </td>
                      <td
                        className={`${style.item_clicks} p-0 pe-5 border-bottom-0`}
                      >
                        {item.clicks}
                      </td>
                      <td
                        className={`${style.item_percentage} p-0 border-bottom-0`}
                      >
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    className={`${style.item_total_label} border-bottom-0 p-0 ps-4`}
                  >
                    Total
                  </th>
                  <th
                    className={`${style.item_total} p-0 text-end pe-5 border-bottom-0`}
                  >
                    {totalClicks}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChartThirdPage;
