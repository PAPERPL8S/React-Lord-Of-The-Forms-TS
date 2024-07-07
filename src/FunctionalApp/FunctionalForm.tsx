import React, { useState, useEffect } from "react";
import "../index.css";
import ErrorMessage from "../_Components/ErrorMessage";
import useFormState from "../Hooks/UseFormState";
import useValidation from "../Hooks/UseValidation";
import FunctionalTextInput from "../_Components/FunctionalTextInput";
import FunctionalPhoneInput from "../Hooks/FunctionalPhoneInput";
import { validationRules } from "../utils/ValidationRules";
import useHandleChange from "../Hooks/UseHandleChange";
import { initialFormDataFn } from "../utils/InitialFormData";
import { UserData } from "../utils/types";
import { allCities } from "../utils/all-cities";

interface FunctionalFormProps {
  userData: UserData;
  onSubmit: (formData: UserData) => void;
}

const FunctionalForm: React.FC<FunctionalFormProps> = ({
  userData,
  onSubmit,
}) => {
  const initialFormData = initialFormDataFn(userData);
  const [formData, setFormData] = useFormState(initialFormData);
  const [errors, validate, markTouched, touched] = useValidation(
    formData,
    validationRules,
  );
  const [submitted, setSubmitted] = useState(false);

  const { handleChange, handlePhoneChange, sectionRefs } =
    useHandleChange(setFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      onSubmit(formData);
      alert("Form submitted successfully!");
      setFormData(initialFormDataFn({}));
    } else {
      alert("Bad Inputs");
    }
  };

  useEffect(() => {
    setFormData(initialFormDataFn(userData));
  }, [userData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>
        <FunctionalTextInput
          label="First Name:"
          name="firstName"
          placeholder="Bilbo"
          value={formData.firstName}
          onChange={(e) => {
            handleChange(e as React.ChangeEvent<HTMLInputElement>, 0);
            markTouched("firstName");
          }}
          ref={sectionRefs[0]}
          id="firstName"
        />
        {submitted && touched.firstName && errors.firstName && (
          <ErrorMessage message={errors.firstName} show={true} />
        )}

        <FunctionalTextInput
          label="Last Name:"
          name="lastName"
          placeholder="Baggins"
          value={formData.lastName ?? ""}
          onChange={(e) => {
            handleChange(e as React.ChangeEvent<HTMLInputElement>, 1);
            markTouched("lastName");
          }}
          ref={sectionRefs[1]}
          id="lastName"
        />
        {submitted && touched.lastName && errors.lastName && (
          <ErrorMessage message={errors.lastName} show={true} />
        )}

        <FunctionalTextInput
          label="Email:"
          name="email"
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={formData.email ?? ""}
          onChange={(e) => {
            handleChange(e as React.ChangeEvent<HTMLInputElement>, 2);
            markTouched("email");
          }}
          ref={sectionRefs[2]}
          id="email"
        />
        {submitted && touched.email && errors.email && (
          <ErrorMessage message={errors.email} show={true} />
        )}

        <FunctionalTextInput
          label="City:"
          name="city"
          placeholder="Hobbiton"
          value={formData.city ?? ""}
          onChange={(e) => {
            handleChange(e as React.ChangeEvent<HTMLInputElement>, 3);
            markTouched("city");
          }}
          ref={sectionRefs[3]}
          isSelect={true}
          options={allCities}
          id="city"
        />
        {submitted && touched.city && errors.city && (
          <ErrorMessage message={errors.city} show={true} />
        )}

        <FunctionalPhoneInput
          label="Phone:"
          phone={formData.phone}
          onChange={handlePhoneChange}
          refs={sectionRefs.slice(4, 8)}
        />
        {submitted && touched.phone && errors.phone && (
          <ErrorMessage message={errors.phone} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FunctionalForm;
