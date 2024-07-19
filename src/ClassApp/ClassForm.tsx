import React, { Component, createRef, RefObject } from "react";
import { UserData } from "../utils/types";
import ErrorMessage from "../ErrorMessage";
import ClassInputField from "./ClassInputField";
import ClassPhoneInput from "./ClassPhoneInput";
import { initialFormDataFn } from "../utils/InitialFormData";
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
  formData: UserData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  submitted: boolean;
  phoneRefs: RefObject<HTMLInputElement>[];
}

class ClassForm extends Component<ClassFormProps, ClassFormState> {
  constructor(props: ClassFormProps) {
    super(props);

    const initialFormData = initialFormDataFn(this.props.userData);
    this.state = {
      formData: initialFormData,
      errors: {},
      touched: {},
      submitted: false,
      phoneRefs: Array(4)
        .fill(0)
        .map(() => createRef<HTMLInputElement>()),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
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
      formData: {
        ...prevState.formData,
        [name]: value,
      },
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
    this.validateField(name, value);
  }

  handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      this.setState((prevState) => {
        const phone = [...(prevState.formData.phone as string[])];
        phone[index] = value;
        const phoneString = phone.join("");
        this.validateField("phone", phoneString);
        return {
          formData: {
            ...prevState.formData,
            phone,
          },
          touched: {
            ...prevState.touched,
            phone: true,
          },
        };
      });

      if (value.length === 2 && index < 3) {
        const nextIndex = index + 1;
        this.state.phoneRefs[nextIndex].current?.focus();
      }
    }
  }

  validate() {
    const { formData } = this.state;
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

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.setState({ submitted: true });
    if (this.validate()) {
      this.props.onSubmit(this.state.formData);
      alert("Form submitted successfully!");
      this.setState({
        formData: initialFormDataFn({}),
        errors: {},
        touched: {},
        submitted: false,
      });
    } else {
      alert("Bad Inputs");
    }
  }

  render() {
    const { formData, errors, touched } = this.state;
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
              value={formData.firstName}
              onChange={this.handleChange}
              onBlur={() => this.validateField("firstName", formData.firstName)}
              id="firstName"
            />
            {touched.firstName && errors.firstName && (
              <ErrorMessage message={errors.firstName} show={true} />
            )}
          </div>

          <div className="input-wrap">
            <ClassInputField
              label="Last Name:"
              name="lastName"
              placeholder="Baggins"
              value={formData.lastName ?? ""}
              onChange={this.handleChange}
              onBlur={() => this.validateField("lastName", formData.lastName)}
              id="lastName"
            />
            {touched.lastName && errors.lastName && (
              <ErrorMessage message={errors.lastName} show={true} />
            )}
          </div>

          <div className="input-wrap">
            <ClassInputField
              label="Email:"
              name="email"
              placeholder="bilbo-baggins@adventurehobbits.net"
              value={formData.email ?? ""}
              onChange={this.handleChange}
              onBlur={() => this.validateField("email", formData.email)}
              id="email"
            />
            {touched.email && errors.email && (
              <ErrorMessage message={errors.email} show={true} />
            )}
          </div>

          <div className="input-wrap">
            <ClassInputField
              label="City:"
              name="city"
              placeholder="Hobbiton"
              value={formData.city ?? ""}
              onChange={this.handleChange}
              onBlur={() => this.validateField("city", formData.city)}
              id="city"
              isSelect={true}
              options={allCities}
            />
            {touched.city && errors.city && (
              <ErrorMessage message={errors.city} show={true} />
            )}
          </div>

          <div className="phone-input-container">
            <label className="phone-label">Phone:</label>
            <ClassPhoneInput
              phone={
                Array.isArray(formData.phone)
                  ? formData.phone
                  : [formData.phone]
              }
              onChange={this.handlePhoneChange}
              refs={this.state.phoneRefs}
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
  }
}

export default ClassForm;
