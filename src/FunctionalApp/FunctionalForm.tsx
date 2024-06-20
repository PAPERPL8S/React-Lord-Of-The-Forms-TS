import React, { useState } from "react";
import { ErrorMessage } from "../_Components/ErrorMessage";
import "../index.css";
import useFormState from "../Hooks/UseFormState";
import useValidation from "../Hooks/UseValidation";
import FunctionalTextInput from "../_Components/FunctionalTextInput";
import FunctionalPhoneInput from "../Hooks/FunctionalPhoneInput";
import { validationRules } from "../utils/ValidationRules";
import { useHandleChange } from "../Hooks/UseHandleChange";

interface UserData {
  firstName: string;
  lastName?: string;
  email?: string;
  city: string;
  phone?: string[] | null;
}

const FunctionalForm: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [formData, setFormData] = useFormState(userData);
  const [errors, validate] = useValidation(formData, validationRules);
  const [submitted, setSubmitted] = useState(false);

  const { handleChange, handlePhoneChange, sectionRefs } =
    useHandleChange(setFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      alert("Form submitted successfully!");
    } else {
      alert("Error Detected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>
      <FunctionalTextInput
        label="First Name:"
        name="firstName"
        placeholder="Bilbo"
        value={formData.firstName}
        onChange={(e) => handleChange(e, 0)}
        ref={sectionRefs[0]}
      />
      {submitted && errors.firstName && (
        <ErrorMessage message={errors.firstName} show={true} />
      )}

      <FunctionalTextInput
        label="Last Name:"
        name="lastName"
        placeholder={"Baggins"}
        value={(formData as UserData).lastName ?? ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event, 1)
        }
        ref={sectionRefs[1]}
      />
      {submitted && errors.lastName && (
        <ErrorMessage message={errors.lastName} show={true} />
      )}

      <FunctionalTextInput
        label="Email:"
        name="email"
        placeholder="bilbo-baggins@adventurehobbits.net"
        value={(formData as UserData).email ?? ""}
        onChange={(e) => handleChange(e, 2)}
        ref={sectionRefs[2]}
      />
      {submitted && errors.email && (
        <ErrorMessage message={errors.email} show={true} />
      )}

      <FunctionalTextInput
        label="City:"
        name="city"
        placeholder={"Hobbiton"}
        value={formData.city ?? ""}
        onChange={(e) => handleChange(e, 3)}
        ref={sectionRefs[3]}
      />
      {submitted && errors.city && (
        <ErrorMessage message={errors.city} show={true} />
      )}

      <FunctionalPhoneInput
        label="Phone:"
        phone={formData.phone ?? ["", "", "", ""]}
        onChange={handlePhoneChange}
        refs={sectionRefs.slice(4, 8)}
      />
      {submitted && errors.phone && (
        <ErrorMessage message={errors.phone} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};

export default FunctionalForm;
