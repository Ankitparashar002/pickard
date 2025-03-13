import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./OrganicContentPage.module.css";

const OrganicContentPage = ({
  startDate,
  endDate,
  apiOrganicContent,
  title,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const [queriesData, setQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMouseEnter = (index) => setActiveRow(index);
  const handleMouseLeave = () => setActiveRow(null);

  // Format dates for API request (YYYY-MM-DD)
  const formattedStart = startDate.toISOString().split("T")[0];
  const formattedEnd = endDate.toISOString().split("T")[0];

  // Build API URL using the provided base URL
  const baseUrl = "https://localhost:7050/api";
  const url = `${baseUrl}/${apiOrganicContent.apiurl}/${apiOrganicContent.url}?StartDate=${formattedStart}&EndDate=${formattedEnd}`;

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
          // Transform API object to an array of objects
          let formattedData = Object.entries(result.data).map(
            ([label, clicks]) => ({
              label,
              clicks: parseInt(clicks, 10),
            })
          );

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

          // Assign a color to each data entry based on its index
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

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate the maximum clicks value to determine progress width
  const maxClicks = Math.max(...queriesData.map((item) => item.clicks));

  return (
    <div className={`${style.Orgnaic_content_box}`}>
      <h5 className={` ${style.Organic_Content_data_title}`}>
        {title.toUpperCase()}
      </h5>
      <table
        className="table table-sm table-striped"
        style={{ fontSize: "14px" }}
      >
        <thead>
          <tr>
            <th style={{ fontSize: "13px" }}>Page</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {queriesData.map((item, index) => {
            const progressWidth = (item.clicks / maxClicks) * 100;

            return (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={activeRow === index ? "table-primary" : ""}
              >
                <td
                  title={item.label}
                  className={`${style.Organic_Content_data}`}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      marginRight: "6px",
                    }}
                  ></span>
                  {item.label}
                </td>
                <td className={`${style.progress_bar}`}>
                  <div className="d-flex align-items-center">
                    <span style={{ marginRight: "10px", minWidth: "30px" }}>
                      {item.clicks}
                    </span>
                    <div
                      className="progress"
                      style={{
                        flexGrow: 1,
                        height: "6px",
                        borderRadius: "0",
                        "--bs-progress-bg": "transparent",
                      }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${progressWidth}%`,
                          backgroundColor: "#53682d",
                          borderRadius: 0,
                        }}
                        aria-valuenow={progressWidth}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrganicContentPage;
