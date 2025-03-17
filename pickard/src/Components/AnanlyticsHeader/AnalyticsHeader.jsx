import React from "react";
import style from "./AnalyticsHeader.module.css";
import DateRangePicker from "../DatePicker/DatePicker";

const AnalyticsHeader = ({ startDate, endDate, onDateChange, title }) => {
  return (
    <div
      className={`${style.header_box_main_div} d-flex justify-content-center `}
    >
      {/* Top Navigation/Header */}
      <nav className={`${style.header_box}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="col col-md-3">
            <img
              src="../src/assets/image/logo.png"
              alt=""
              style={{ width: "98%" }}
            />
          </div>

          {/* Date Range & Share Icon */}
          <div className="d-flex align-items-center flex-column col-md-9">
            <div
              className={`${style.date_box} d-flex flex-row justify-content-between col-md-12`}
            >
              <div className="date-range me-3 col-md-6">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={onDateChange}
                />
              </div>

              <button className="btn btn-link p-0 text-secondary text-white">
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
            <div className="col-md-12">
              <h1
                className={`${style.analyticsHeader_heading} col-md-12 text-white`}
              >
                EA TECHNOLOGIES - {title}
              </h1>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AnalyticsHeader;
