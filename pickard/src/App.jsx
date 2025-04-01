import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignUp from "./Module/Login/GoogleLogin";
import SecondView from "./Module/Dashboard/AnanlyticsLandingPage/Components/SecondView/SecondView";
import ApiWrapper from "./Module/Dashboard/Ananlytics/Components/ApiWrapper/ApiWrapper";
import SettingPage from "./Module/Settings/Settings";

import SocialMediaIntegrations from "./Module/Integrations/SocialMediaIntegrations";
import NewGoogleLogin from "./Module/Login/NewGoogleLogin";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import SignupPage from "./Pages/SignUpPage/SignUpPage.jsx";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On mount, check localStorage for auth state
  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated");
    if (authState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("googleUserId");
  };

  return (
    <GoogleOAuthProvider clientId="876888217643-1ohg7sp7qd85h9k2s8l4vi44skl6p8t5.apps.googleusercontent.com">
      <Router>
        <Navbar bg="light" expand={false}>
          <Container fluid>
            <Navbar.Brand as={Link} to="/api">
              My Analytics App
            </Navbar.Brand>
            {/* Toggle Button for Offcanvas */}
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            {/* Offcanvas Sidebar */}
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/api">
                    Landing Page
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    Analytics
                  </Nav.Link>
                  <Nav.Link as={Link} to="/settings">
                    Settings
                  </Nav.Link>
                  <Nav.Link as={Link} to="/socialmediaintegration">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/newlogin">
                    new
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>

                  {isAuthenticated ? (
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Nav.Link as={Link} to="/googlesignup">
                      GoogleSignUp
                    </Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <div style={{ background: "#f0f0f0", cursor: "pointer" }}>
          <Routes>
            <Route path="/" element={<SecondView />} />
            <Route path="/api" element={<ApiWrapper />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/newlogin" element={<NewGoogleLogin />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
            <Route
              path="/socialmediaintegration"
              element={<SocialMediaIntegrations />}
            />
            <Route
              path="/googlesignup"
              element={<GoogleSignUp setIsAuthenticated={setIsAuthenticated} />}
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
