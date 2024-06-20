import { useState, useEffect } from "react";
import { initialFormData } from "./InitialFormData";


interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  phone?: string | string[];
}

const useFormState = (userData: UserData) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        city: userData.city || "",
        phone: userData.phone
          ? (Array.isArray(userData.phone)
              ? userData.phone
              : userData.phone.match(/.{1,2}/g)) || ["", "", "", ""]
          : ["", "", "", ""],
      });
    }
  }, [userData]);

  return [formData, setFormData];
};

export default useFormState;
