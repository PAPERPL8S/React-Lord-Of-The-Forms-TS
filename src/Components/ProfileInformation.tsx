import React from "react";
import {
  capitalize,
  ensureArray,
  formatPhoneNumber,
} from "../utils/transformations";
import { UserData } from "../utils/types";

interface ProfileInformationProps {
  userData: UserData | null;
  submitted: boolean;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  userData,
  submitted,
}) => {
  if (!submitted) {
    return (
      <div className="no-info">
        <p>No information provided</p>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const phoneArray = ensureArray(userData.phone);
  const phoneString = phoneArray.join("");
  const formattedPhone = formatPhoneNumber(phoneString);

  return (
    <div className="profile-info-container">
      <h3 className="profile-info-title">Your Submitted User Information</h3>
      <p>First Name: {capitalize(userData.firstName)}</p>
      <p>Last Name: {capitalize(userData.lastName ?? "")}</p>
      <p>Email: {userData.email}</p>
      <p>City: {capitalize(userData.city)}</p>
      <p>Phone: {formattedPhone}</p>
    </div>
  );
};

export default ProfileInformation;
