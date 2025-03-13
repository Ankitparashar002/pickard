import React, { useRef, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AnalyticsChartSecondPage.module.css"; // your custom CSS module

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsChartSecondPage = ({
  startDate,
  endDate,
  title,
  apiEndPoint,
  subtitle,
}) => {
  const [queriesData, setQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format dates for API request (YYYY-MM-DD)
  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];

  const baseUrl = "https://localhost:7050/api";
  const url = `${baseUrl}/${apiEndPoint.apiurl}/${apiEndPoint.url}?StartDate=${formattedStart}&EndDate=${formattedEnd}`;

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
          let formattedData = Object.entries(result.data).map(
            ([label, clicks]) => ({
              label,
              clicks: parseInt(clicks, 10),
            })
          );

          // Sort data in descending order
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

          // Assign colors AFTER sorting
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

  // Chart options
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
        display: false,
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

  // Hover handlers for table rows
  const handleMouseEnterLabel = (dataIndex) => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const meta = chart.getDatasetMeta(0).data[dataIndex];
    const { x, y } = meta.getProps(["x", "y"], true);

    chart.setActiveElements([{ datasetIndex: 0, index: dataIndex }]);
    chart.tooltip.setActiveElements([{ datasetIndex: 0, index: dataIndex }], {
      x,
      y,
    });
    chart.update();

    setActiveRow(dataIndex);
  };

  const handleMouseLeaveLabel = () => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    chart.setActiveElements([]);
    chart.tooltip.setActiveElements([]);
    chart.update();

    setActiveRow(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!queriesData.length) return <p style={{ margin: "0px" }}></p>;

  return (
    <div className={`container ${style.analyticsCard}`}>
      <div className="container">
        <div className={`${style.analyticsCard_table} row`}>
          <h5 className={` ${style.analyticsCard_title}`}>
            {title.toUpperCase()}
          </h5>
          {/* Donut Chart */}
          <div
            className={`${style.doughnut_chart} col-md-5 d-flex justify-content-center `}
          >
            <div style={{ width: "150px", height: "150px" }}>
              <Doughnut
                ref={chartRef}
                data={chartData}
                options={chartOptions}
              />
            </div>
          </div>

          {/* Table */}
          <div className={`${style.chart_data} col-md-7`}>
            <table className="table table-borderless table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th className={`${style.item_label}`}>
                    {queriesData.length > 0 ? title : "Label"}
                  </th>
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
                      <td className={`${style.AnalyticsChartSecondPage_data}`}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            marginRight: "8px",
                          }}
                        />
                        <span className={`${style.item_label_data}`}>
                          {item.label}
                        </span>
                      </td>

                      <td
                        className={`${style.item_percentage} p-0 border-bottom-0 text-end`}
                      >
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChartSecondPage;
