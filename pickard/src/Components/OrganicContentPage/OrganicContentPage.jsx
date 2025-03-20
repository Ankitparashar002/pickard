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
          // Dynamically check for a nested object where every value can be parsed as a number.
          let rawData = result.data;
          for (const key in result.data) {
            const value = result.data[key];
            if (
              typeof value === "object" &&
              value !== null &&
              Object.values(value).every((v) => !isNaN(parseInt(v, 10)))
            ) {
              rawData = value;
              break;
            }
          }

          // Transform the API object to an array of objects with label and click
          let formattedData = Object.entries(rawData).map(([label, value]) => ({
            label,
            click: parseInt(value, 10),
          }));

          // Sort data in descending order by click count
          formattedData.sort((a, b) => b.click - a.click);

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
    return (
      <div className={style.loaderContainer}>
        <div className={style.spinner}></div>
        <p className={style.acquiringText}>Acquiring...</p>
      </div>
    );
  }

  // Calculate the total clicks to derive percentages
  const totalClicks = queriesData.reduce((acc, item) => acc + item.click, 0);

  if (!queriesData.length) return <p style={{ margin: "0px" }}></p>;
  return (
    <div className={`${style.Orgnaic_content_box}`}>
      <h5 className={`${style.Organic_Content_data_title}`}>
        {title.toUpperCase()}
      </h5>
      <table
        className="table table-sm table-striped"
        style={{ fontSize: "14px" }}
      >
        <thead>
          <tr>
            <th style={{ fontSize: "13px" }}>Page</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {queriesData.map((item, index) => {
            // Calculate the percentage of this click value relative to total clicks
            const percentage =
              totalClicks > 0 ? (item.click / totalClicks) * 100 : 0;
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
                      {percentage.toFixed(1)}%
                    </span>
                    <div
                      className="progress"
                      style={{ flexGrow: 1, height: "6px", borderRadius: "0" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: "#53682d",
                          borderRadius: 0,
                        }}
                        aria-valuenow={percentage}
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
