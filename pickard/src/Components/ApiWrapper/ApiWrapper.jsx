import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AnalyticsChart from "../AnanlyticsChart/AnalyticsChart";
import PagePathView from "../PagePathView/PagePathView";
import apiEndpoints from "./apiEndpoints";
import AnalyticsHeader from "../AnanlyticsHeader/AnalyticsHeader";
function ApiWrapper() {
  // Initialize state for startDate and endDate
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  // Callback function to update dates
  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <>
      {/* Header with Title and Date Range */}
      <AnalyticsHeader
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />
      <Container className="p-4">
        {/* Page Queries Section */}
        <Row className="mt-5">
          <Col md={12}>
            {apiEndpoints.map((api) => (
              <AnalyticsChart
                key={api.id}
                id={api.id}
                apiEndPoint={api}
                startDate={startDate}
                endDate={endDate}
                title={api.title}
              />
            ))}
            <PagePathView startDate={startDate} endDate={endDate} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ApiWrapper;
