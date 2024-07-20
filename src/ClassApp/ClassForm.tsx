import React, { Component } from "react";
import { UserData } from "../utils/types";
import ErrorMessage from "../ErrorMessage";
import ClassInputField from "./ClassInputField";
import ClassPhoneInput from "./ClassPhoneInput";
import { allCities } from "../utils/all-cities";
import {
  isEmailValid,
  isCityValid,
  isPhoneValid,
  isNameValid,
} from "../utils/validations";

interface ClassFormProps {
  userData: UserData;
  onSubmit: (formData: UserData) => void;
}

interface ClassFormState {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string[];
  errors: Record<string, string>;
  submitted: boolean;
}

class ClassForm extends Component<ClassFormProps, ClassFormState> {
  constructor(props: ClassFormProps) {
    super(props);

    this.state = {
      firstName: props.userData.firstName || "",
      lastName: props.userData.lastName || "",
      email: props.userData.email || "",
      city: props.userData.city || "",
      phone: Array.isArray(props.userData.phone)
        ? props.userData.phone
        : ["", "", "", ""],
      errors: {},
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateField(name: string, value: string) {
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
      const phoneLength = value.replace(/[^0-9]/g, "").length;
      if (!isPhoneValid(value) || phoneLength !== 7) {
        error = "Invalid Phone Number";
      } else {
        error = "";
      }
    }

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }));
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    this.validateField(name, value);
  }

  handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      this.setState((prevState) => {
        const phone = [...prevState.phone];
        phone[index] = value;
        const phoneString = phone.join("");
        this.validateField("phone", phoneString);
        return {
          phone,
        };
      });
    }
  }

  validate() {
    const { firstName, lastName, email, city, phone } = this.state;
    const errors: Record<string, string> = {};

    if (!isNameValid(firstName)) {
      errors.firstName =
        "First name must be at least 2 characters long and should not contain numbers";
    }

    if (!isNameValid(lastName || "")) {
      errors.lastName =
        "Last name must be at least 2 characters long and should not contain numbers";
    }

    if (!isEmailValid(email || "")) {
      errors.email = "Email is Invalid";
    }

    if (!isCityValid(city, allCities)) {
      errors.city = "City is Invalid";
    }

    if (!isPhoneValid(phone.join(""))) {
      errors.phone = "Invalid Phone Number";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.setState({ submitted: true });
    if (this.validate()) {
      const { firstName, lastName, email, city, phone } = this.state;
      const formData: UserData = { firstName, lastName, email, city, phone };
      this.props.onSubmit(formData);
      alert("Form submitted successfully!");
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: ["", "", "", ""],
        errors: {},
        submitted: false,
      });
    } else {
      alert("Bad Inputs");
    }
  }

  render() {
    const { firstName, lastName, email, city, phone, errors, submitted } =
      this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="user-info-form">
          <u>
            <h3>User Information Form</h3>
          </u>
          <div className="input-wrap">
            <ClassInputField
              label="First Name:"
              name="firstName"
              placeholder="Bilbo"
              value={firstName}
              onChange={this.handleChange}
              onBlur={() => this.validateField("firstName", firstName)}
              id="firstName"
            />
            <ErrorMessage
              message={errors.firstName}
              show={submitted && !!errors.firstName}
            />
          </div>

          <div className="input-wrap">
            <ClassInputField
              label="Last Name:"
              name="lastName"
              placeholder="Baggins"
              value={lastName}
              onChange={this.handleChange}
              onBlur={() => this.validateField("lastName", lastName)}
              id="lastName"
            />
            <ErrorMessage
              message={errors.lastName}
              show={submitted && !!errors.lastName}
            />
          </div>

          <div className="input-wrap">
            <ClassInputField
              label="Email:"
              name="email"
              placeholder="bilbo-baggins@adventurehobbits.net"
              value={email}
              onChange={this.handleChange}
              onBlur={() => this.validateField("email", email)}
              id="email"
            />
            <ErrorMessage
              message={errors.email}
              show={submitted && !!errors.email}
            />
          </div>

          <div className="input-wrap">
            <ClassInputField
              label="City:"
              name="city"
              placeholder="Hobbiton"
              value={city}
              onChange={this.handleChange}
              onBlur={() => this.validateField("city", city)}
              id="city"
              isSelect={true}
              options={allCities}
            />
            <ErrorMessage
              message={errors.city}
              show={submitted && !!errors.city}
            />
          </div>

          <div className="phone-input-container">
            <label className="phone-label">Phone:</label>
            <ClassPhoneInput
              phone={phone}
              onChange={this.handlePhoneChange}
              placeholders={["55", "55", "55", "5"]}
            />
            <ErrorMessage
              message={errors.phone}
              show={submitted && !!errors.phone}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ClassForm;
