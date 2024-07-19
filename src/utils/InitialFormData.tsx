import { UserData } from "./types";

export const ensureArray = (
  phone: string[] | string | null | undefined,
): string[] => {
  if (Array.isArray(phone)) return phone;
  if (typeof phone === "string") {
    return phone.match(/.{1,2}/g) || ["", "", "", ""];
  }
  return ["", "", "", ""];
};

export const initialFormDataFn = (userData: Partial<UserData>): UserData => {
  return {
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    city: userData.city || "",
    phone: ensureArray(userData.phone),
  };
};

export const initialFormData: UserData = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: ["", "", "", ""],
};
