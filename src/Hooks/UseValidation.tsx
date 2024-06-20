import { useState } from "react";

interface FormData {
  [key: string]: any;
}

const convertToString = (value: any) => {
  if (Array.isArray(value)) {
    return value.join("");
  } else if (typeof value === "string" || value instanceof String) {
    return value;
  } else {
    return "";
  }
};

interface ValidationRule {
  field: string;
  validate: (value: any) => boolean;
  errorMessage: string;
}

const useValidation = (
  formData: FormData,
  validationRules: ValidationRule[],
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = convertToString(formData[field]);
      if (!validate(value)) {
        newErrors[field] = errorMessage;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return [errors, validate] as const;
};

export default useValidation;
