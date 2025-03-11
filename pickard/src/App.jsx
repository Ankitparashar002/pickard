import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ApiWrapper from "./Components/ApiWrapper/ApiWrapper";
function App() {
  return (
    <div style={{ background: "#f0f0f0" }}>
      <ApiWrapper />
    </div>
  );
}

export default App;
