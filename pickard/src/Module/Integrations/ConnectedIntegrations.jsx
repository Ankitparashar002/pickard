import React from "react";

export default function ConnectedIntegrations({
  connected,
  handleRemoveIntegration,
  handleGetDetails,
}) {
  return (
    <div>
      <h2>Connected Integrations</h2>
      <div className="connected-list">
        {connected.length > 0 ? (
          connected.map((integration, index) => (
            <div key={index} className="connected-item">
              <span>
                {integration.icon} {integration.name}
              </span>
              <div className="button-group">
                <button
                  className="details-btn"
                  onClick={() => handleGetDetails(integration.name)}
                  title="Get details"
                  aria-label={`Get details for ${integration.name}`}
                >
                  Get Details
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveIntegration(integration.name)}
                  title="Remove integration"
                  aria-label={`Remove ${integration.name} integration`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="noResult">No connected integrations</p>
        )}
      </div>
    </div>
  );
}
