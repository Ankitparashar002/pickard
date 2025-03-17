import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import apiEndpoints from "./apiEndpoints";
import apiEndpointsTwo from "./apiEndpointsTwo";
import AnalyticsChartSecondPage from "../AnalyticschartSecondPage/AnalyticsChartSecondPage";
import AnalyticsHeader from "../AnanlyticsHeader/AnalyticsHeader";
import style from "./SecondView.module.css";
import OrganicContentPage from "../OrganicContentPage/OrganicContentPage";
import apiOrganicContent from "../SecondView/apiOrganicContent";
import TrafficCard from "../TrafficCard/TrafficCard";
import apiEnagagementReport from "./apiEnagagementReport";
import apiRetention from "./apiRetention";

function SecondView() {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <>
      <AnalyticsHeader
        title="ANALYTICS"
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />

      <Container
        className="pt-4"
        style={{
          backgroundColor: "#fafafa",
          width: "73%",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">ENGAGEMENT</h4>{" "}
        </div>
        <Row className="mt-3">
          {apiEnagagementReport.map((api) => (
            <Col md={3} className="mb-3" key={api.id}>
              <TrafficCard
                startDate={startDate}
                endDate={endDate}
                apiEnagagementReport={api}
                title={api.title}
              />
            </Col>
          ))}
        </Row>

        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">RETENTION</h4>{" "}
        </div>
        <Row className="mt-3">
          {apiRetention.map((api) => (
            <Col md={3} className="mb-3" key={api.id}>
              <TrafficCard
                startDate={startDate}
                endDate={endDate}
                apiEnagagementReport={api}
                title={api.title}
              />
            </Col>
          ))}
        </Row>

        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">USERS</h4>{" "}
        </div>
        <Row className="mt-3">
          {apiEndpoints.map((api) => (
            <Col md={6} className="mb-2">
              <AnalyticsChartSecondPage
                key={api.id}
                id={api.id}
                apiEndPoint={api}
                startDate={startDate}
                endDate={endDate}
                title={api.title}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Container
        className="pt-4 "
        style={{
          backgroundColor: "#fafafa",
          width: "73%",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">GEOGRAPHY</h4>{" "}
        </div>
        <Row className="mt-3">
          {apiEndpointsTwo.map((api) => (
            <Col md={6} className="mb-3">
              <AnalyticsChartSecondPage
                key={api.id}
                id={api.id}
                apiEndPoint={api}
                startDate={startDate}
                endDate={endDate}
                title={api.title}
                subtitle={api.subtitle}
              />
            </Col>
          ))}
        </Row>

        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">Organic Content Intrests</h4>{" "}
        </div>
        <Row className="mt-3">
          {apiOrganicContent.map((api) => (
            <Col md={6} className="mb-3">
              <OrganicContentPage
                key={api.id}
                id={api.id}
                apiOrganicContent={api}
                title={api.title}
                startDate={startDate}
                endDate={endDate}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default SecondView;
