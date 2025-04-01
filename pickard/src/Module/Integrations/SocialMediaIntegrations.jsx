import React, { useState } from "react";
import AvailableIntegrations from "./AvailableIntegrations";
import ConnectedIntegrations from "./ConnectedIntegrations";
import "./SocialMediaIntegrations.css";

export default function SocialMediaIntegrations() {
  const [search, setSearch] = useState("");
  const [connected, setConnected] = useState([]);

  const handleAddIntegration = (integration) => {
    if (!connected.find((item) => item.name === integration.name)) {
      setConnected([...connected, integration]);
    }
  };

  const handleRemoveIntegration = (name) => {
    setConnected(connected.filter((item) => item.name !== name));
  };

  const handleGetDetails = (name) => {
    alert(`Fetching details for ${name}...`);
    // Add logic to fetch details for the integration (e.g., API call)
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Integrations</h1>
        <div className="grid">
          <AvailableIntegrations
            search={search}
            setSearch={setSearch}
            handleAddIntegration={handleAddIntegration}
          />
          <ConnectedIntegrations
            connected={connected}
            handleRemoveIntegration={handleRemoveIntegration}
            handleGetDetails={handleGetDetails}
          />
        </div>
      </div>
    </div>
  );
}
