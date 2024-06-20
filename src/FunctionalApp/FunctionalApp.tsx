import React from "react";
import FunctionalForm from "./FunctionalForm";
import ProfileInformation from "../_Components/ProfileInformation";
import "../App.css";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string[];
  city: string;
}

const defaultUser: User = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: ["1234567"],
  city: "Hobbiton",
};

const FunctionalApp: React.FC = () => {
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={defaultUser} />
      <FunctionalForm userData={defaultUser} />
    </>
  );
};

export default FunctionalApp;
