import { allCities } from "./all-cities";
import {
  isEmailValid,
  isCityValid,
  isPhoneValid,
  isNameValid,
} from "./validations";

export interface ValidationRule {
  field: string;
  validate: (value: string) => boolean;
  errorMessage: string;
}

export const validationRules: ValidationRule[] = [
  {
    field: "firstName",
    validate: isNameValid,
    errorMessage:
      "First name must be at least 2 characters long and should not contain numbers",
  },
  {
    field: "lastName",
    validate: isNameValid,
    errorMessage:
      "Last name must be at least 2 characters long and should not contain numbers",
  },
  {
    field: "email",
    validate: isEmailValid,
    errorMessage: "Email is Invalid",
  },
  {
    field: "city",
    validate: (value: string) => isCityValid(value, allCities),
    errorMessage: "City is Invalid",
  },
  {
    field: "phone",
    validate: (value: string) => isPhoneValid(value),
    errorMessage: "Invalid Phone Number",
  },
];
