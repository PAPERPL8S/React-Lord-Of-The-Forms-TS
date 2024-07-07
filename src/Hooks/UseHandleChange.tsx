import { useRef } from "react";
import { UserData } from "../utils/types";

const useHandleChange = (
  setFormData: React.Dispatch<React.SetStateAction<UserData>>,
) => {
  const sectionRefs = Array.from({ length: 8 }, () =>
    useRef<HTMLInputElement>(null),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const phone = [...prevFormData.phone];
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

        return { ...prevFormData, phone };
      }
      return prevFormData;
    });
  };

  return { handleChange, handlePhoneChange, sectionRefs };
};

export default useHandleChange;
