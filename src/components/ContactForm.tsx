import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SosIcon from "@mui/icons-material/Sos";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface FormData {
  name: string;
  surname: string;
  email: string;
  description: string;
  acceptPrivacyPolicy: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required, please complete it"),
  surname: Yup.string(),
  email: Yup.string()
    .email("Incorrect e-mail address")
    .required("This field is required, please complete it"),
  description: Yup.string()
    .max(1000, "The description cannot exceed 1000 characters")
    .required("This field is required, please complete it"),
  acceptPrivacyPolicy: Yup.boolean().oneOf(
    [true],
    "You must accept the privacy policy before submitting"
  ),
});

export const ContactForm: React.FC = () => {
  const handleSubmit = (values: FormData, { resetForm }: any) => {
    alert(JSON.stringify(values));
    resetForm();
  };

  const initialValues: FormData = {
    name: "",
    surname: "",
    email: "",
    description: "",
    acceptPrivacyPolicy: false,
  };

  const placeholderDescription =
    "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.";

  return (
    <div className="form">
      <h1>
        Let's get in <span className="text-green">touch</span>
      </h1>
      <div className="form__quote">
        <blockquote>
          <p>{placeholderDescription}</p>
          <span>Carl Gustav Jung</span>
        </blockquote>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form__field">
              <PersonIcon
                className={`form__input ${
                  errors.name && touched.name && "field-error"
                }`}
                aria-label="Person Icon"
              />
              <Field
                type="text"
                id="name"
                name="name"
                className={`form__input ${
                  errors.name && touched.name && "field-error"
                }`}
                placeholder="Name*"
                aria-label="Name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              <ErrorMessage
                name="name"
                component="span"
                className="error"
                id="name-error"
              />
            </div>
            <div className="form__field">
              <PersonIcon
                className={`form__input ${
                  errors.surname && touched.surname && "field-error"
                }`}
                aria-label="Person Icon"
              />
              <Field
                type="text"
                id="surname"
                name="surname"
                className={`form__input ${
                  errors.surname && touched.surname && "field-error"
                }`}
                placeholder="Surname"
                aria-label="Surname"
                aria-invalid={!!errors.surname}
                aria-describedby={errors.surname ? "surname-error" : undefined}
              />
              <ErrorMessage
                name="surname"
                component="span"
                className="error"
                id="surname-error"
              />
            </div>
            <div className="form__field">
              <EmailIcon
                className={`form__input ${
                  errors.email && touched.email && "field-error"
                }`}
                aria-label="Email Icon"
              />
              <Field
                type="text"
                id="email"
                name="email"
                className={`form__input ${
                  errors.email && touched.email && "field-error"
                }`}
                placeholder="E-mail*"
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="error"
                id="email-error"
              />
            </div>
            <div className="form__field description">
              <Field
                as="textarea"
                id="description"
                name="description"
                className={`form__textarea ${
                  errors.description && touched.description && "field-error"
                }`}
                placeholder="Please describe your question or issue*"
                aria-label="Description"
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
              />
              <ErrorMessage
                name="description"
                component="span"
                className="error"
                id="description-error"
              />
            </div>
            <div className="form__field form__field--checkbox privacy">
              <label className="form__field__checkbox">
                <Field type="checkbox" name="acceptPrivacyPolicy" />
                <p>I have read and agree to the Privacy Policy.*</p>
              </label>
              <ErrorMessage
                name="acceptPrivacyPolicy"
                component="span"
                className="error"
                id="privacy-policy-error"
              />
            </div>
            <button type="submit" className="form__button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className="contact-info">
        <div className="contact-info__item-wrapper">
          <div className="item-wrapper__icon">
            <PhoneAndroidIcon className="footer-icon" />
          </div>
          <div className="item-wrapper__text">
            <span className="info-label">Phone</span>
            <span className="info-value">111 111 111</span>
          </div>
        </div>
        <div className="contact-info__item-wrapper">
          <div className="item-wrapper__icon">
            <EmailIcon className="footer-icon" />
          </div>
          <div className="item-wrapper__text">
            <span className="info-label">E-MAIL</span>
            <span className="info-value">info@contact.pl</span>
          </div>
        </div>
        <div className="contact-info__item-wrapper">
          <div className="item-wrapper__icon">
            <SosIcon className="footer-icon" />
          </div>
          <div className="item-wrapper__text">
            <span className="info-label">Helpdesk</span>
            <span className="info-value">http://helpdesk.pl</span>
          </div>
        </div>
      </div>
    </div>
  );
};
