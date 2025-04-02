import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Removed confirmPassword since it wasn’t used in the form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!values.email) {
      errors.email = "Please enter a valid email address.";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Please enter a valid password.";
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
    setTouched({
      email: true,
      password: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://localhost:7050/api/UserLogin/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const responseData = await response.json(); // Get response body

        if (!response.ok) {
          throw new Error(responseData.message || "Invalid email or password.");
        }

        console.log("Login successful:", responseData);
        navigate("/");
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: error.message, // Store the error message from backend
        }));
      } finally {
        setIsSubmitting(false);
      }
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
        <h1 className={styles.title}>Sign in to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="email"
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
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`${styles.input} ${
                errors.password && touched.password ? styles.inputError : ""
              }`}
            />
            {errors.password && touched.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.forgotPasswordGroup}>
            <a href="/forgetpassword" className={styles.forget_pass}>
              Forgot your password?
            </a>
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitBtn}>
              Sign In
            </button>
          </div>
          {errors.submit && (
            <span className={styles.error}>{errors.submit}</span>
          )}
        </form>
        <div className={styles.loginLink}>
          Don’t have an account?{" "}
          <a href="/signup" className={styles.link}>
            Start your free trial!
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
