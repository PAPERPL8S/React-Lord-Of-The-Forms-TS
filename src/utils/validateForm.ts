import { ValidationRule } from "../utils/ValidationRules";

interface FormData {
  [key: string]: any;
}

const convertToString = (value: any) => {
  if (Array.isArray(value)) {
    return value.join("");
  } else if (typeof value === "string" || value instanceof String) {
    return value.toString();
  } else {
    return "";
  }
};

export const validateForm = (
  formData: FormData,
  validationRules: ValidationRule[],
) => {
  const errors: Record<string, string> = {};

  validationRules.forEach(({ field, validate, errorMessage }) => {
    const value = convertToString(formData[field]);
    if (!validate(value)) {
      errors[field] = errorMessage;
    }
  });

  return errors;
};
