import React from "react";
import {
  FaPinterest,
  FaFacebook,
  FaGoogle,
  FaTiktok,
  FaReddit,
} from "react-icons/fa";
import { SiGoogleanalytics, SiMeta } from "react-icons/si";

const integrationsData = [
  { name: "Pinterest", icon: <FaPinterest className="red-icon" /> },
  { name: "Pinterest Ads", icon: <FaPinterest className="red-icon" /> },
  { name: "Reddit Ads", icon: <FaReddit className="orange-icon" /> },
  { name: "TikTok", icon: <FaTiktok className="black-icon" /> },
  {
    name: "Google Analytics 4",
    icon: <SiGoogleanalytics className="yellow-icon" />,
  },
  { name: "Google Ads", icon: <FaGoogle className="blue-icon" /> },
  { name: "Facebook Insights", icon: <FaFacebook className="blue-icon" /> },
  { name: "Meta Ads", icon: <SiMeta className="blue-icon" /> },
];

export default function AvailableIntegrations({
  search,
  setSearch,
  handleAddIntegration,
}) {
  const filteredIntegrations = integrationsData.filter((integration) =>
    integration.name.toLowerCase().includes(search)
  );

  return (
    <div>
      <h2>Available Integrations</h2>
      <input
        type="text"
        placeholder="Search..."
        className="search-box"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <ul className="integration-list">
        {filteredIntegrations.length > 0 ? (
          filteredIntegrations.map((integration, index) => (
            <li key={index} className="integration-item">
              <span className="integration-name">
                {integration.icon} {integration.name}
              </span>
              <button
                className="add-btn"
                onClick={() => handleAddIntegration(integration)}
                title="Add integration"
                aria-label={`Add ${integration.name} integration`}
              >
                +
              </button>
            </li>
          ))
        ) : (
          <li className="no-result-item">🚫 Result not found</li>
        )}
      </ul>
    </div>
  );
}
