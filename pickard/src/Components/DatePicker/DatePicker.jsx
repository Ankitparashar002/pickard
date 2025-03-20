import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "/src/App.css";
import style from "./DatePicker.module.css";

const DateRangePicker = ({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Year to Date");
  const [displayText, setDisplayText] = useState(
    `${initialStartDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} - ${initialEndDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`
  );
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const periods = [
    "Year to Date",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "Last Week (Monday To Sunday)",
    "This Week (Monday To Sunday)",
    "Last Week (Sunday To Saturday)",
    "This Week (Sunday To Saturday)",
    "Last Month",
    "This Month",
    "Last Quarter",
    "This Quarter",
    "Last Year",
    "This Year",
    "Fixed period",
  ];

  // Update local state when props change
  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setDisplayText(
      `${initialStartDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} - ${initialEndDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`
    );
  }, [initialStartDate, initialEndDate]);

  // Compute the new date range based on the selected period
  // but do not update the parent state or close the modal yet.
  const calculateDateRange = (period) => {
    const today = new Date();
    let start, end;

    switch (period) {
      case "Year to Date":
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        start = yesterday;
        end = new Date(today);
        break;
      case "Last 7 Days":
        end = new Date();
        start = new Date(today.setDate(today.getDate() - 7));
        break;
      case "Last 30 Days":
        end = new Date();
        start = new Date(today.setDate(today.getDate() - 30));
        break;
      case "Last Week (Monday To Sunday)":
        end = new Date(today.setDate(today.getDate() - today.getDay()));
        start = new Date(today.setDate(today.getDate() - 6));
        break;
      case "This Week (Monday To Sunday)":
        start = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        end = new Date(today.setDate(today.getDate() + 6));
        break;
      case "Last Week (Sunday To Saturday)":
        end = new Date(today.setDate(today.getDate() - today.getDay() - 1));
        start = new Date(today.setDate(today.getDate() - 6));
        break;
      case "This Week (Sunday To Saturday)":
        start = new Date(today.setDate(today.getDate() - today.getDay()));
        end = new Date(today.setDate(today.getDate() + 6));
        break;
      case "Last Month":
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case "This Month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Last Quarter":
        start = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3 - 3,
          1
        );
        end = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3,
          0
        );
        break;
      case "This Quarter":
        start = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3,
          1
        );
        end = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3 + 3,
          0
        );
        break;
      case "Last Year":
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
      case "This Year":
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        return;
    }

    // Update local state with the computed dates.
    setStartDate(start);
    setEndDate(end);
    // Note: We no longer update displayText or call onDateChange here.
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    if (period !== "Fixed period") {
      // Compute the new dates but do not apply them until VIEW PERIOD is clicked.
      calculateDateRange(period);
    }
  };

  // When the VIEW PERIOD button is clicked, apply the changes.
  const handleSubmit = () => {
    if (startDate && endDate) {
      if (startDate.getTime() === endDate.getTime()) {
        alert("Start date and end date cannot be the same");
        return;
      }
      if (startDate > endDate) {
        alert("Start date cannot be after end date");
        return;
      }
      // Now update the display text and apply the new dates.
      setDisplayText(
        `${startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`
      );
      setIsOpen(false);
      // Pass the updated dates to the parent component.
      onDateChange(startDate, endDate);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    const defaultStart = new Date(new Date().getFullYear(), 0, 1);
    const defaultEnd = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
    setDisplayText(
      `${defaultStart.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} - ${defaultEnd.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`
    );
    setSelectedPeriod("Year to Date");
    // Pass the default dates back to the parent.
    onDateChange(defaultStart, defaultEnd);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={displayText}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        style={{
          width: "426px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "2px",
          fontSize: "14px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      />

      {isOpen && (
        <div
          className={`${style.date_range_picker_modal} date-range-picker-modal`}
        >
          <div className={`${style.modal_header} `}>
            <label className="label">PERIOD</label>
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodSelect(e.target.value)}
              style={{
                width: "100%",
                padding: "5px",
                border: "1px solid #c3c8cc",
              }}
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          {selectedPeriod === "Fixed period" && (
            <div className="section">
              <div className="date-picker-container">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="YYYY-MM-DD"
                  className="custom-date-input"
                />
                <span style={{ margin: "0 10px" }}>-</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="YYYY-MM-DD"
                  className="custom-date-input"
                />
              </div>
            </div>
          )}

          <div className={`${style.button_container}`}>
            <button className={`${style.cancel_button}`} onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={`${style.view_period_button} `}
              onClick={handleSubmit}
            >
              VIEW PERIOD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
