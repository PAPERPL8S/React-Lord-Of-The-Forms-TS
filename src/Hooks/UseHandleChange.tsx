import { useRef } from "react";

export const useHandleChange = (setFormData: (callback: any) => void) => {
  const sectionRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData[name] = value;

      if (value.length === 80 && sectionIndex < 3) {
        const nextSectionIndex = sectionIndex + 1;
        const nextSectionRef = sectionRefs[nextSectionIndex];
        nextSectionRef.current?.focus();
      }

      if (value === "" && sectionIndex > 0) {
        const prevSectionIndex = sectionIndex - 1;
        const prevSectionRef = sectionRefs[prevSectionIndex];
        prevSectionRef.current?.focus();
      }

      return updatedFormData;
    });
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    setFormData((prevFormData: any) => {
      const phone = [...prevFormData.phone];
      if (
        /^\d*$/.test(value) &&
        (index < 3 ? value.length <= 2 : value.length <= 4)
      ) {
        phone[index] = value;
        const updatedFormData = { ...prevFormData, phone };

        if (value.length === (index < 3 ? 2 : 4) && index < 3) {
          const nextIndex = index + 1;
          sectionRefs[nextIndex + 4].current?.focus();
        }

        if (value === "" && index > 0) {
          const prevIndex = index - 1;
          sectionRefs[prevIndex + 4].current?.focus();
        }

        return updatedFormData;
      }

      return prevFormData;
    });
  };

  return { handleChange, handlePhoneChange, sectionRefs };
};
