import { UserData } from "./types";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length !== 7) return phoneNumber;
  return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(
    2,
    4,
  )}-${phoneNumber.slice(4, 6)}-${phoneNumber.slice(6)}`;
};

export const ensureArray = (
  phone: string[] | string | null | undefined,
): string[] => {
  if (Array.isArray(phone)) return phone;
  if (typeof phone === "string") return phone.match(/.{1,2}/g) || [];
  return ["", "", "", ""];
};

export const getInitialFormData = (userData: Partial<UserData>): UserData => {
  return {
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    city: userData.city || "",
    phone: ensureArray(userData.phone),
  };
};
