import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

// Client ID from your credentials file
const clientId =
  "3430352330-pc9itvaquqg6gl0stj8aea0nn56djl4h.apps.googleusercontent.com";

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Log the access token and full response
      console.log("Access Token:", tokenResponse.access_token);
      console.log("Full Token Response:", tokenResponse);
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
    onNonOAuthError: (error) => {
      console.error("Non-OAuth Error:", error);
    },
    // Using implicit flow to get access token directly
    flow: "implicit",
    // Scopes for basic profile and email info - adjust as needed
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/analytics.readonly",
    // Optional: specify redirect_uri from your credentials
    redirect_uri: "http://localhost:5173/newlogin",
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Google Login</h2>
        <button
          onClick={() => login()}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login with Google
        </button>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
