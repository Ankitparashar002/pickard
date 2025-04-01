// LoginPage.jsx
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import styles from "./GoogleLogin.module.css";

const GoogleSignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setErrorMessage("");
    // If needed, add email submission logic here.
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("https://localhost:7050/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await response.json();
      console.log("Google auth data:", data);

      // Save the authentication state and user id returned by your backend
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("id", data.id);

      // Redirect to the settings page
      navigate("/settings");
    } catch (error) {
      console.error("Error sending token to backend:", error);
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
    setErrorMessage("Google login failed. Please try again.");
  };

  return (
    <>
      <section className={styles.pageLogin}>
        <div className={styles.headerContainer}>
          <div className={styles.miniContainer}>
            <h2>Welcome to EA Technologies</h2>
            <h5>We're happy to see you with us</h5>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.contentContainer}>
          <div className={styles.loginWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.inputControl} ${styles.formControl}`}
                placeholder="name@company.com"
                required
              />
              <input
                className={styles.buttonPrimary}
                type="submit"
                value="Continue"
              />
            </form>

            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}

            <p className={styles.terms}>
              By proceeding, you agree to the <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>
            </p>
            <div className={styles.orLine}>
              <span>OR</span>
            </div>

            <div className={styles.socialButtons}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GoogleSignUp;
