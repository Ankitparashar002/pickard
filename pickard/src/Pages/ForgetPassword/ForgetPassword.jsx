import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Please enter a valid email address.";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://localhost:7050/api/UserLogin/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
          }
        );

        if (response.ok) {
          setIsEmailSent(true);
        } else {
          const errorData = await response.json();
          setApiMessage(
            errorData.message || "Failed to send reset email. Please try again."
          );
        }
      } catch (error) {
        setApiMessage(
          "The email address doesn’t correspond with an existing account."
        );
      }
      setIsSubmitting(false);
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

        {isEmailSent ? (
          <div className={styles.successMessage}>
            <h1 className={styles.title}>Check Your Inbox</h1>
            <p className={styles.description} style={{ textAlign: "center" }}>
              We’ve sent you an email with a new temporary password and a link
              to reset your password.
            </p>
            <p className={styles.description} style={{ textAlign: "center" }}>
              If you don’t receive the email within 10 minutes, or if you’re
              having trouble resetting your password, don’t hesitate to contact
              us at info@dashthis.com.
            </p>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>
              Reset your <b>Password</b>
            </h1>
            <div className="d-flex justify-content-center">
              <p className={styles.description}>
                We’ll send you an email with a new temporary password, as well
                as a link to follow in order to complete the password reset
                process.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`${styles.input} ${
                    errors.email && touched.email ? styles.inputError : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  Send Reset Email
                </button>
              </div>
            </form>
            {apiMessage && (
              <div className={styles.apiMessage}>{apiMessage}</div>
            )}
          </>
        )}
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

export default ForgetPassword;
