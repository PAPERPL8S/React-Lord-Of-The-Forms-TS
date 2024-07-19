import React, { useState } from "react";
import "../index.css";
import ErrorMessage from "../ErrorMessage";
import FunctionalTextInput from "../FunctionalApp/FunctionalTextInput";
import FunctionalPhoneInput from "../FunctionalApp/FunctionalPhoneInput";
import { initialFormDataFn } from "../utils/InitialFormData";
import { UserData } from "../utils/types";
import { allCities } from "../utils/all-cities";
import {
  isEmailValid,
  isCityValid,
  isPhoneValid,
  isNameValid,
} from "../utils/validations";

interface FunctionalFormProps {
  userData: UserData;
  onSubmit: (formData: UserData) => void;
}

const FunctionalForm: React.FC<FunctionalFormProps> = ({
  userData,
  onSubmit,
}) => {
  const initialFormData = initialFormDataFn(userData);
  const [formData, setFormData] = useState<UserData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [_submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "firstName" || name === "lastName") {
      if (!isNameValid(value)) {
        error =
          name === "firstName"
            ? "First name must be at least 2 characters long and should not contain numbers"
            : "Last name must be at least 2 characters long and should not contain numbers";
      }
    }

    if (name === "email") {
      if (!isEmailValid(value)) {
        error = "Email is Invalid";
      }
    }

    if (name === "city") {
      if (!isCityValid(value, allCities)) {
        error = "City is Invalid";
      }
    }

    if (name === "phone") {
      if (!isPhoneValid(value)) {
        error = "Invalid Phone Number";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    validateField(name, value);
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const phone = [...(prevFormData.phone as string[])];
      phone[index] = value;
      const phoneString = phone.join("");
      validateField("phone", phoneString);
      return {
        ...prevFormData,
        phone,
      };
    });
    setTouched((prevTouched) => ({
      ...prevTouched,
      phone: true,
    }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!isNameValid(formData.firstName)) {
      errors.firstName =
        "First name must be at least 2 characters long and should not contain numbers";
    }

    if (!isNameValid(formData.lastName || "")) {
      errors.lastName =
        "Last name must be at least 2 characters long and should not contain numbers";
    }

    if (!isEmailValid(formData.email || "")) {
      errors.email = "Email is Invalid";
    }

    if (!isCityValid(formData.city, allCities)) {
      errors.city = "City is Invalid";
    }

    if (
      Array.isArray(formData.phone) &&
      !isPhoneValid(formData.phone.join(""))
    ) {
      errors.phone = "Invalid Phone Number";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      onSubmit(formData);
      alert("Form submitted successfully!");
      setFormData(initialFormDataFn({}));
      setErrors({});
      setTouched({});
      setSubmitted(false);
    } else {
      alert("Bad Inputs");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="user-info-form">
        <u>
          <h3>User Information Form</h3>
        </u>
        <div className="input-wrap">
          <FunctionalTextInput
            label="First Name:"
            name="firstName"
            placeholder="Bilbo"
            value={formData.firstName}
            onChange={handleChange}
            id="firstName"
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          {touched.firstName && errors.firstName && (
            <ErrorMessage message={errors.firstName} show={true} />
          )}
        </div>

        <div className="input-wrap">
          <FunctionalTextInput
            label="Last Name:"
            name="lastName"
            placeholder="Baggins"
            value={formData.lastName ?? ""}
            onChange={handleChange}
            id="lastName"
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          {touched.lastName && errors.lastName && (
            <ErrorMessage message={errors.lastName} show={true} />
          )}
        </div>

        <div className="input-wrap">
          <FunctionalTextInput
            label="Email:"
            name="email"
            placeholder="bilbo-baggins@adventurehobbits.net"
            value={formData.email ?? ""}
            onChange={handleChange}
            id="email"
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          {touched.email && errors.email && (
            <ErrorMessage message={errors.email} show={true} />
          )}
        </div>

        <div className="input-wrap">
          <FunctionalTextInput
            label="City:"
            name="city"
            placeholder="Hobbiton"
            value={formData.city ?? ""}
            onChange={handleChange}
            id="city"
            isSelect={true}
            options={allCities}
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          {touched.city && errors.city && (
            <ErrorMessage message={errors.city} show={true} />
          )}
        </div>

        <div className="phone-input-container">
          <label className="phone-label">Phone:</label>
          <FunctionalPhoneInput
            phone={
              Array.isArray(formData.phone) ? formData.phone : [formData.phone]
            }
            onChange={handlePhoneChange}
            refs={
              Array.isArray(formData.phone)
                ? formData.phone.map(() => React.createRef<HTMLInputElement>())
                : []
            }
            placeholders={["55", "55", "55", "5"]}
          />
          {touched.phone && errors.phone && (
            <ErrorMessage message={errors.phone} show={true} />
          )}
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FunctionalForm;
