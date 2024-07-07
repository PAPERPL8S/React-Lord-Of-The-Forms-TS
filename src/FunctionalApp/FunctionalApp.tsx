import React, { useState } from "react";
import FunctionalForm from "./FunctionalForm";
import ProfileInformation from "../ProfileInformation";
import "../App.css";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string[];
  city: string;
}

const defaultUser: UserData = {
  email: "",
  firstName: "",
  lastName: "",
  phone: ["", "", "", ""],
  city: "",
};

const FunctionalApp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(defaultUser);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (formData: UserData) => {
    setUserData(formData);
    setSubmitted(true);
  };

  return (
    <div className="functional-app">
      <h2>Functional</h2>
      <ProfileInformation userData={userData} submitted={submitted} />
      <FunctionalForm userData={userData} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default FunctionalApp;
