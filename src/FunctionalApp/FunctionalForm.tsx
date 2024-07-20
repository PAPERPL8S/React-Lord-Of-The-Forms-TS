import React, { useState } from "react";
import "../index.css";
import ErrorMessage from "../ErrorMessage";
import FunctionalTextInput from "../FunctionalApp/FunctionalTextInput";
import FunctionalPhoneInput from "../FunctionalApp/FunctionalPhoneInput";
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
  const [firstName, setFirstName] = useState<string>(userData.firstName || "");
  const [lastName, setLastName] = useState<string>(userData.lastName || "");
  const [email, setEmail] = useState<string>(userData.email || "");
  const [city, setCity] = useState<string>(userData.city || "");
  const [phone, setPhone] = useState<string[]>(
    Array.isArray(userData.phone) ? userData.phone : ["", "", "", ""],
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    setPhone((prevPhone) => {
      const newPhone = [...prevPhone];
      newPhone[index] = value;
      return newPhone;
    });
  };

  const validate = () => {
    let isValid = true;

    if (!isNameValid(firstName)) {
      isValid = false;
    }

    if (!isNameValid(lastName || "")) {
      isValid = false;
    }

    if (!isEmailValid(email || "")) {
      isValid = false;
    }

    if (!isCityValid(city, allCities)) {
      isValid = false;
    }

    if (!isPhoneValid(phone.join(""))) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      onSubmit({ firstName, lastName, email, city, phone });
      alert("Form submitted successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setCity("");
      setPhone(["", "", "", ""]);
      setSubmitted(false);
    } else {
      alert("Bad Inputs");
    }
  };

  const getErrorMessage = (field: string): string => {
    if (!submitted) return "";

    switch (field) {
      case "firstName":
        return !isNameValid(firstName)
          ? "First name must be at least 2 characters long and should not contain numbers"
          : "";
      case "lastName":
        return !isNameValid(lastName || "")
          ? "Last name must be at least 2 characters long and should not contain numbers"
          : "";
      case "email":
        return !isEmailValid(email || "") ? "Email is Invalid" : "";
      case "city":
        return !isCityValid(city, allCities) ? "City is Invalid" : "";
      case "phone":
        return !isPhoneValid(phone.join("")) ? "Invalid Phone Number" : "";
      default:
        return "";
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
            value={firstName}
            onChange={handleChange}
            id="firstName"
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          <ErrorMessage
            message={getErrorMessage("firstName")}
            show={submitted && getErrorMessage("firstName") !== ""}
          />
        </div>

        <div className="input-wrap">
          <FunctionalTextInput
            label="Last Name:"
            name="lastName"
            placeholder="Baggins"
            value={lastName ?? ""}
            onChange={handleChange}
            id="lastName"
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          <ErrorMessage
            message={getErrorMessage("lastName")}
            show={submitted && getErrorMessage("lastName") !== ""}
          />
        </div>

        <div className="input-wrap">
          <FunctionalTextInput
            label="Email:"
            name="email"
            placeholder="bilbo-baggins@adventurehobbits.net"
            value={email ?? ""}
            onChange={handleChange}
            id="email"
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          <ErrorMessage
            message={getErrorMessage("email")}
            show={submitted && getErrorMessage("email") !== ""}
          />
        </div>

        <div className="input-wrap">
          <FunctionalTextInput
            label="City:"
            name="city"
            placeholder="Hobbiton"
            value={city ?? ""}
            onChange={handleChange}
            id="city"
            isSelect={true}
            options={allCities}
            ref={React.createRef<HTMLInputElement>()}
            className="text-input"
          />
          <ErrorMessage
            message={getErrorMessage("city")}
            show={submitted && getErrorMessage("city") !== ""}
          />
        </div>

        <div className="phone-input-container">
          <label className="phone-label">Phone:</label>
          <FunctionalPhoneInput
            phone={phone}
            onChange={handlePhoneChange}
            placeholders={["55", "55", "55", "5"]}
          />
          <ErrorMessage
            message={getErrorMessage("phone")}
            show={submitted && getErrorMessage("phone") !== ""}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FunctionalForm;
