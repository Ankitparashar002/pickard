import React, { useState, useEffect } from "react";
import style from "./SignUpPage.module.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyWebsite: "",
    phone: "",
    businessEmail: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
    }
    setIsSubmitting(false);
  }, [errors, isSubmitting, formData]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;

    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.companyWebsite) {
      errors.companyWebsite = "Company website is required";
    } else if (!urlRegex.test(values.companyWebsite)) {
      errors.companyWebsite = "Invalid website URL";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!values.businessEmail) {
      errors.businessEmail = "Email is required";
    } else if (!emailRegex.test(values.businessEmail)) {
      errors.businessEmail = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }
    if (!values.acceptTerms) errors.acceptTerms = "You must accept the terms";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    setIsSubmitting(true);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background:
          "url('https://i.postimg.cc/B6N19smT/register-background-new.jpg') center/cover",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "transparent",
          paddingTop: "60px",
          paddingBottom: "10px",
        }}
      >
        <div className="row justify-content-center">
          <div className={`${style.FirstBox} col-md-6 col-lg-6 mb-4`}>
            <div className="text-center my-5">
              <img
                src="https://i.postimg.cc/28NfJd7c/logo.png"
                alt="Company logo"
                className="img-fluid"
                style={{ width: "50%" }}
              />
            </div>
            <div className="text-center mb-4">
              <img
                src="https://i.postimg.cc/Prgfy4Zb/laptop-register.png"
                alt="Laptop"
                className={style.laptop_img}
              />
            </div>
            <div className={`${style.list} d-flex justify-content-center`}>
              <ul className="list-unstyled text-white">
                <li>
                  <i class="fa fa-check" aria-hidden="true"></i> No credit card
                  required
                </li>
                <li>
                  {" "}
                  <i class="fa fa-check" aria-hidden="true"></i> Includes all
                  features
                </li>
                <li>
                  {" "}
                  <i class="fa fa-check" aria-hidden="true"></i> Includes your
                  own Product Specialist
                </li>
                <li>
                  {" "}
                  <i class="fa fa-check" aria-hidden="true"></i> Includes
                  unlimited users & data sources
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`${style.SecondBox} col-md-6 col-lg-6 d-flex justify-content-center p-0`}
          >
            <div className={`${style.FormBox} card`}>
              <h2 className={style.title}>Start your 15-day free trial!</h2>

              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${style.input} ${
                        errors.firstName && touched.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className={`${style.error} invalid-feedback`}>
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6" style={{ paddingTop: "8px" }}>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${style.input} ${
                        errors.lastName && touched.lastName ? "is-invalid" : ""
                      }`}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className={`${style.error} invalid-feedback`}>
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="url"
                    name="companyWebsite"
                    className={`form-control ${style.input} ${
                      errors.companyWebsite && touched.companyWebsite
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Company Website"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.companyWebsite && touched.companyWebsite && (
                    <div className={`${style.error} invalid-feedback`}>
                      {errors.companyWebsite}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${style.input} ${
                      errors.phone && touched.phone ? "is-invalid" : ""
                    }`}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && touched.phone && (
                    <div className={`${style.error} invalid-feedback`}>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="businessEmail"
                    className={`form-control ${style.input} ${
                      errors.businessEmail && touched.businessEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Business Email"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.businessEmail && touched.businessEmail && (
                    <div className={`${style.error} invalid-feedback`}>
                      {errors.businessEmail}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${style.input} ${
                      errors.password && touched.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className={`${style.error} invalid-feedback`}>
                      {errors.password}
                    </div>
                  )}
                </div>

                <div
                  className={`form-check ${style.checkbox} ${
                    errors.acceptTerms && touched.acceptTerms
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    className="form-check-input"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="form-check-label">
                    I accept the <a href="#">terms and conditions.</a>
                  </label>
                  {errors.acceptTerms && touched.acceptTerms && (
                    <div className={`${style.error} invalid-feedback`}>
                      {errors.acceptTerms}
                    </div>
                  )}
                </div>

                <button type="submit" className={style.submitBtn}>
                  START FREE TRIAL NOW
                </button>

                <div className={style.loginLink}>
                  Already have an account with us?{" "}
                  <a href="/login" className={style.link}>
                    Sign in here
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
