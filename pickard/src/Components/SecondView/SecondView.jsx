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
import apiEnagagementReport from "./apiEnagagementReport.js";
import apiRetention from "./apiRetention";
import AnanlyticsGraph from "../AnanlyticsGraph/AnanlyticsGraph";
import apiDirectEngagementRate from "./apiDirectEagagementRate";
import OrganicCards from "../OrganicCards/OrganicCards.jsx";
import AnalyticsChartThirdPage from "../AnalyticsChartThirdPage/AnalyticsChartThirdPage.jsx";
import { apiDirectHourDayOfWeek } from "./apiDirect.js";
import {
  apiReferralSources,
  apiReferralEngagementRate,
} from "./apiReferral.js";
import {
  apiAcquisitioncards,
  apiAcquisitionSession,
} from "./apiAcquisition.js";
import {
  apiOrganicSearchSources,
  apiDirectGetSessionsPerUser,
  apiDirectGetEngagementRate,
} from "./apiOrganicSearchSources.js";

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
        style={{
          backgroundColor: "#fafafa",
          width: "73%",
          paddingLeft: "30px",
          paddingRight: "30px",
          position: "relative",
          top: "-130px",
          paddingTop: "100px",
        }}
      >
        {/* Acquisition Section start */}
        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">Acquisition</h4>{" "}
        </div>
        <Row className="mt-3">
          <Col md={12}>
            <AnanlyticsGraph
              startDate={startDate}
              endDate={endDate}
              geturl="AcquisitionReport"
              url="GetTotalSessionsTrends"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          {apiAcquisitionSession.map((api) => (
            <Col md={12} className="mb-3">
              <AnalyticsChartThirdPage
                key={api.id}
                id={api.id}
                apiEndPoint={api}
                startDate={startDate}
                endDate={endDate}
                title={api.title}
              />
            </Col>
          ))}
          <Row className="mt-3">
            {apiAcquisitioncards.map((api) => (
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
        </Row>
        {/* Acquisition Section end */}

        {/* Organic Search Section start */}
        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">ORGANIC SEARCH</h4>{" "}
        </div>
        <Row className="mt-3">
          <Col md={9}>
            <AnanlyticsGraph
              startDate={startDate}
              endDate={endDate}
              geturl="OrganicSearchReport"
              url="GetTrafficTrend"
            />
          </Col>
          {apiDirectGetEngagementRate.map((api) => (
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
        <Row className="mt-3">
          {apiOrganicSearchSources.map((api) => (
            <Col md={9} className="mb-3">
              <AnalyticsChartThirdPage
                key={api.id}
                id={api.id}
                apiEndPoint={api}
                startDate={startDate}
                endDate={endDate}
                title={api.title}
              />
            </Col>
          ))}
          {apiDirectGetSessionsPerUser.map((api) => (
            <Col md={2} className="mb-3" key={api.id}>
              <TrafficCard
                startDate={startDate}
                endDate={endDate}
                apiEnagagementReport={api}
                title={api.title}
              />
            </Col>
          ))}
        </Row>
        {/* Organic Search Section end */}

        {/* Direct Section start */}
        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">DIRECT</h4>{" "}
        </div>
        <Row className="mt-3">
          <Col md={9}>
            <AnanlyticsGraph
              startDate={startDate}
              endDate={endDate}
              geturl="DirectReport"
              url="GetTrafficTrend"
            />
          </Col>
          {apiDirectGetEngagementRate.map((api) => (
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
        <Row className="mt-3">
          {apiDirectHourDayOfWeek.map((api) => (
            <Col
              md={4}
              className={`${style.direct_section_progress_card} mb-3`}
            >
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
          {apiDirectGetSessionsPerUser.map((api) => (
            <Col md={2} className="mb-3" key={api.id}>
              <TrafficCard
                startDate={startDate}
                endDate={endDate}
                apiEnagagementReport={api}
                title={api.title}
              />
            </Col>
          ))}
        </Row>
        {/* Direct Section end */}

        {/* Referral Section start */}
        <div className={`${style.table_heading} `}>
          {" "}
          <h4 className="mb-0">REFERRAL</h4>{" "}
        </div>
        <Row className="mt-3">
          <Col md={9}>
            <AnanlyticsGraph
              startDate={startDate}
              endDate={endDate}
              geturl="ReferralReport"
              url="GetReferralTrafficTrend"
            />
          </Col>
          {apiDirectEngagementRate.map((api) => (
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
        <Row className="mt-3">
          {apiReferralSources.map((api) => (
            <Col md={9} className="mb-3">
              <AnalyticsChartThirdPage
                key={api.id}
                id={api.id}
                apiEndPoint={api}
                startDate={startDate}
                endDate={endDate}
                title={api.title}
              />
            </Col>
          ))}
          {apiDirectEngagementRate.map((api) => (
            <Col md={2} className="mb-3" key={api.id}>
              <TrafficCard
                startDate={startDate}
                endDate={endDate}
                apiEnagagementReport={api}
                title={api.title}
              />
            </Col>
          ))}
        </Row>
        {/* Referral Section end */}

        {/* Engagement Section start */}
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
        {/* Engagement Section end */}

        {/* Retention Section start */}
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
        {/* Retention Section end */}

        {/* Users Section start */}
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
        {/* Users Section end */}

        {/* Geography Section start */}
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
        {/* Geography Section end */}

        {/* Organic Content Section start */}
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
        {/* Organic Content Section end */}

        {/* Last Section start */}
        <Row className="mt-3">
          <Col md={3}>
            <div className={`${style.table_heading} `}>
              {" "}
              <h4 className="mb-0">WEB (ORGANIC)</h4>{" "}
            </div>
            {apiRetention.map((api) => (
              <Col md={3} className="mb-3 mt-2" key={api.id}>
                <OrganicCards
                  startDate={startDate}
                  endDate={endDate}
                  apiEnagagementReport={api}
                  title={api.title}
                />
              </Col>
            ))}
          </Col>
          <Col md={3}>
            <div className={`${style.table_heading} `}>
              {" "}
              <h4 className="mb-0">IMAGES (ORGANIC)</h4>{" "}
            </div>
            {apiRetention.map((api) => (
              <Col md={3} className="mb-3 mt-2" key={api.id}>
                <OrganicCards
                  startDate={startDate}
                  endDate={endDate}
                  apiEnagagementReport={api}
                  title={api.title}
                />
              </Col>
            ))}
          </Col>
          <Col md={3}>
            <div className={`${style.table_heading} `}>
              {" "}
              <h4 className="mb-0">VIDEOES (ORGANIC)</h4>{" "}
            </div>
            {apiRetention.map((api) => (
              <Col md={3} className="mb-3 mt-2" key={api.id}>
                <OrganicCards
                  startDate={startDate}
                  endDate={endDate}
                  apiEnagagementReport={api}
                  title={api.title}
                />
              </Col>
            ))}
          </Col>
        </Row>

        {/* Last Section end */}
      </Container>
    </>
  );
}

export default SecondView;
