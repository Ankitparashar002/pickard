// SettingsPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import AnalyticsHeader from "../Navbar/Components/AnanlyticsHeader/AnalyticsHeader";

const SettingsPage = () => {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [title, setTitle] = useState("ANALYTICS LANDING PAGE");
  const [propertyId, setPropertyId] = useState("");

  // Handle file input changes
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (logo) {
      formData.append("companyLogo", logo); // Key must match backend model
    }
    formData.append("companyName", title); // Company name
    formData.append("propertyId", propertyId);

    // Retrieve the Google user id stored after login
    const id = localStorage.getItem("id");
    if (id) {
      formData.append("UserId", id);
    }

    try {
      const response = await fetch(
        "https://localhost:7050/api/CompanyDetailsReport/add",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Settings saved:", data);
        alert("Settings saved!");
      } else {
        console.error("Upload failed");
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-5 pt-5 pb-5">
      <Row>
        {/* Left Column: Settings Form */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header
              className=" text-white"
              style={{ backgroundColor: "#52682d" }}
            >
              <h4 className="mb-0">Settings</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="logo" className="mb-3">
                  <Form.Label>Logo File</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </Form.Group>

                {logoPreview && (
                  <Form.Group className="mb-3 text-center">
                    <Form.Label>Logo Preview</Form.Label>
                    <div>
                      <Image
                        src={logoPreview}
                        alt="Logo Preview"
                        thumbnail
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </Form.Group>
                )}

                <Form.Group controlId="title" className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter company name"
                  />
                </Form.Group>

                <Form.Group controlId="propertyId" className="mb-3">
                  <Form.Label>Property ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    placeholder="Enter property ID"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ background: "#758757" }}
                  className="text-white"
                >
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Header Preview */}
        <Col md={8}>
          <h4 className="mb-5 text-center">Header Preview</h4>
          <AnalyticsHeader
            startDate={new Date()} // Replace with actual dates as needed
            endDate={new Date()}
            onDateChange={() => {}}
            title={title}
            logo={logoPreview}
            propertyId={propertyId}
            preview={true} // Removes extra padding for preview mode
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
