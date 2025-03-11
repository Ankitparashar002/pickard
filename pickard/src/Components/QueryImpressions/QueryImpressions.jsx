import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const QueryImpressions = () => {
  const [activeRow, setActiveRow] = useState(null);
  const handleMouseEnter = (index) => setActiveRow(index);
  const handleMouseLeave = () => setActiveRow(null);

  const hoursData = [
    { hour: 11, sessions: 9.4, color: "#4CAF50" },
    { hour: 14, sessions: 7.5, color: "#9C27B0" },
    { hour: 13, sessions: 6.6, color: "#2196F3" },
    { hour: 12, sessions: 5.9, color: "#FFC107" },
    { hour: 10, sessions: 5.8, color: "#FF5722" },
    { hour: 15, sessions: 5.6, color: "#009688" },
    { hour: 9, sessions: 5.3, color: "#E91E63" },
    { hour: 17, sessions: 5.3, color: "#795548" },
  ];

  const maxSessions = Math.max(...hoursData.map((item) => item.sessions));

  return (
    <div style={{ margin: "1rem 0" }}>
      <h4 style={{ marginBottom: "1rem" }}>Hourly Sessions</h4>
      <table
        className="table table-sm table-striped"
        style={{ fontSize: "14px" }}
      >
        <thead>
          <tr>
            <th>Hour</th>
            <th>Sessions</th>
          </tr>
        </thead>
        <tbody>
          {hoursData.map((item, index) => {
            const progressWidth = (item.sessions / maxSessions) * 100;

            return (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={activeRow === index ? "table-primary" : ""}
              >
                {/* First Column (Hour) */}
                <td title={item.hour}>
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
                  {item.hour}
                </td>

                {/* Second Column (Progress Bar) */}
                <td>
                  <div className="d-flex align-items-center">
                    <span style={{ marginRight: "10px", minWidth: "30px" }}>
                      {item.sessions}%
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

export default QueryImpressions;
