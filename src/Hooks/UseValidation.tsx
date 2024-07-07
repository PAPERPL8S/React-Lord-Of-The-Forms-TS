import { useState, useEffect } from "react";
import { validationRules, ValidationRule } from "../utils/ValidationRules";

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

const useValidation = (
  formData: FormData,
  validationRules: ValidationRule[],
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = convertToString(formData[field]);
      if (!validate(value)) {
        newErrors[field] = errorMessage;
      }
    });
    setErrors(newErrors);
  }, [formData, validationRules]);

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

  const markTouched = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return [errors, validate, markTouched, touched] as const;
};

export default useValidation;
