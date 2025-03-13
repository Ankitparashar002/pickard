import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ApiWrapper from "./Components/ApiWrapper/ApiWrapper";
import SecondView from "./Components/SecondView/SecondView";
function App() {
  return (
    <div style={{ background: "#f0f0f0" }}>
      {/* <ApiWrapper /> */}
      <SecondView />
    </div>
  );
}

export default App;
