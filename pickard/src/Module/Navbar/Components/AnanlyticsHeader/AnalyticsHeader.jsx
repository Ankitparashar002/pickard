// AnalyticsHeader.jsx
import React from "react";
import style from "./AnalyticsHeader.module.css";
import DateRangePicker from "../DatePicker/DatePicker";

const AnalyticsHeader = ({
  startDate,
  endDate,
  onDateChange,
  title,
  logo,
  propertyId, // Optional property id
  preview = false, // Control preview mode
}) => {
  const handleShare = async () => {
    const shareData = {
      title: title || "EA TECHNOLOGIES",
      text: `Check out the analytics for ${title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying link:", error);
      }
    } else {
      alert("Share functionality is not supported in your browser.");
    }
  };

  return (
    <div
      className={`${style.header_box_main_div} d-flex justify-content-center`}
      style={preview ? { padding: 0, backgroundColor: "#f0f0f0" } : {}}
    >
      <nav className={`${style.header_box}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="col col-md-3">
            <img
              src={logo || "https://i.postimg.cc/28NfJd7c/logo.png"}
              alt="EA TECHNOLOGIES logo"
              style={{ width: "98%" }}
            />
          </div>
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
              <button
                onClick={handleShare}
                className="btn btn-link p-0 text-secondary text-white"
              >
                <img
                  src="https://i.postimg.cc/JzxT8BSW/share-icon.png"
                  alt="Share"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </div>
            <div className="col-md-12">
              <h1
                className={`${style.analyticsHeader_heading} col-md-12 text-white`}
              >
                {title ? `EA TECHNOLOGIES - ${title}` : "EA TECHNOLOGIES"}
              </h1>
              {propertyId && (
                <p className="text-black">Property ID: {propertyId}</p>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AnalyticsHeader;
