import React, { Component } from "react";
import "../index.css";
import ErrorMessage from "../ErrorMessage";
import ClassTextInput from "../_Components/ClassTextInput";
import ClassPhoneInput from "../Hooks/ClassPhoneInput";
import { validationRules } from "../utils/ValidationRules";
import { initialFormDataFn } from "../utils/InitialFormData";
import { UserData } from "../utils/types";
import { allCities } from "../utils/all-cities";

interface ClassFormProps {
  userData: UserData;
  onSubmit: (formData: UserData) => void;
}

interface ClassFormState {
  formData: UserData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  submitted: boolean;
}

class ClassForm extends Component<ClassFormProps, ClassFormState> {
  state: ClassFormState = {
    formData: initialFormDataFn(this.props.userData),
    errors: {},
    touched: {},
    submitted: false,
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
  };

  handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const phone = [...prevState.formData.phone];
      phone[index] = value;
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
  };

  validate = () => {
    const { formData } = this.state;
    const errors: Record<string, string> = {};

    validationRules.forEach(
      ({
        field,
        validate,
        errorMessage,
      }: {
        field: string;
        validate: (value: string) => boolean;
        errorMessage: string;
      }) => {
        const value =
          field === "phone" ? formData.phone.join("") : formData[field];
        if (!validate(value)) {
          errors[field] = errorMessage;
        }
      },
    );

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (e: React.FormEvent) => {
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
  };

  render() {
    const { formData, errors, touched, submitted } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>
        <ClassTextInput
          ref={React.createRef<HTMLInputElement>()}
          label="First Name:"
          name="firstName"
          placeholder="Bilbo"
          value={formData.firstName}
          onChange={this.handleChange}
          id="firstName"
        />
        {submitted && touched.firstName && errors.firstName && (
          <ErrorMessage message={errors.firstName} show={true} />
        )}

        <ClassTextInput
          label="Last Name:"
          name="lastName"
          placeholder="Baggins"
          value={formData.lastName}
          onChange={this.handleChange}
          id="lastName"
        />
        {submitted && touched.lastName && errors.lastName && (
          <ErrorMessage message={errors.lastName} show={true} />
        )}

        <ClassTextInput
          label="Email:"
          name="email"
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={formData.email}
          onChange={this.handleChange}
          id="email"
        />
        {submitted && touched.email && errors.email && (
          <ErrorMessage message={errors.email} show={true} />
        )}

        <ClassTextInput
          label="City:"
          name="city"
          placeholder="Hobbiton"
          value={formData.city}
          onChange={this.handleChange}
          id="city"
          isSelect={true}
          options={allCities}
          ref={React.createRef<HTMLInputElement>()}
        />
        {submitted && touched.city && errors.city && (
          <ErrorMessage message={errors.city} show={true} />
        )}

        <ClassPhoneInput
          label="Phone:"
          phone={formData.phone}
          onChange={this.handlePhoneChange}
          refs={formData.phone.map(() => React.createRef<HTMLInputElement>())}
        />
        {submitted && touched.phone && errors.phone && (
          <ErrorMessage message={errors.phone} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ClassForm;
