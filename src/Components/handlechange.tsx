import { RefObject } from "react";
import { UserData } from "../utils/types";

interface HandleChange {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    formData: UserData,
    setFormData: (data: UserData) => void,
  ) => void;
  handlePhoneChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    sectionRefs: RefObject<HTMLInputElement>[],
    formData: UserData,
    setFormData: (data: UserData) => void,
  ) => void;
  sectionRefs: RefObject<HTMLInputElement>[];
}

export const createHandleChange = (
  sectionRefs: RefObject<HTMLInputElement>[],
): HandleChange => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formData: UserData,
    setFormData: (data: UserData) => void,
  ) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    sectionRefs: RefObject<HTMLInputElement>[],
    formData: UserData,
    setFormData: (data: UserData) => void,
  ) => {
    const { value } = e.target;
    const phone = [...formData.phone];
    if (
      /^\d*$/.test(value) &&
      (index < 3 ? value.length <= 2 : value.length <= 1)
    ) {
      phone[index] = value;

      if (value.length === (index < 3 ? 2 : 1) && index < 3) {
        const nextIndex = index + 1;
        sectionRefs[nextIndex + 4].current?.focus();
      }

      if (value === "" && index > 0) {
        const prevIndex = index - 1;
        sectionRefs[prevIndex + 4].current?.focus();
      }

      const newFormData = { ...formData, phone };
      setFormData(newFormData);
    }
  };

  return { handleChange, handlePhoneChange, sectionRefs };
};
