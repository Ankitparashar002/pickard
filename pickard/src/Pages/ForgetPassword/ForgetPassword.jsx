import React, { useState, useEffect } from "react";
import styles from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        // Submit form logic here
        console.log("Form submitted:", formData);
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, formData]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.email) {
      errors.email = "Email is required";
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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    setIsSubmitting(true);
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

        <div className="d-flex justify-content-center">
          <p className={styles.description}>
            We’ll send you an email with a new temporary password, as well as a
            link to follow in order to complete the password reset process.
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
              onBlur={handleBlur}
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
            <button type="submit" className={styles.submitBtn}>
              Send Reset Email
            </button>
          </div>
        </form>

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
