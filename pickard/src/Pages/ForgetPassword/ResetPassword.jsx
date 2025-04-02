import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed and used
import styles from "./ForgetPassword.module.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // The form will have new password and confirm password fields, and we'll extract the token from the URL
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  // Extract the token from query parameters when component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token") || "";
    setFormData((prev) => ({ ...prev, token }));
  }, [location.search]);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        // If no errors, call the API to reset the password
        resetPassword();
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

  // Validate new password fields
  const validate = (values) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!values.password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark fields as touched
    setTouched({
      password: true,
      confirmPassword: true,
    });
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  const resetPassword = async () => {
    try {
      const response = await fetch(
        "https://localhost:7050/api/UserLogin/resetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: formData.token,
            newPassword: formData.password,
          }),
        }
      );

      if (response.ok) {
        setApiMessage(
          "Password has been successfully reset. Redirecting to login..."
        );
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await response.json();
        setApiMessage(
          data.message || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      setApiMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img
            src="https://i.postimg.cc/28NfJd7c/logo.png"
            alt="EA TECHNOLOGIES logo"
            style={{ width: "60%" }}
          />
        </div>
        <h1 className={styles.title}>
          Reset your <b>Password</b>
        </h1>
        <p className={styles.description}>Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              className={`${styles.input} ${
                errors.password && touched.password ? styles.inputError : ""
              }`}
            />
            {errors.password && touched.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className={`${styles.input} ${
                errors.confirmPassword && touched.confirmPassword
                  ? styles.inputError
                  : ""
              }`}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitBtn}>
              Reset Password
            </button>
          </div>
        </form>
        {apiMessage && <div className={styles.apiMessage}>{apiMessage}</div>}
        <div className={styles.loginLink}>
          Go back to{" "}
          <a href="/login" className={styles.link}>
            Sign in.
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
