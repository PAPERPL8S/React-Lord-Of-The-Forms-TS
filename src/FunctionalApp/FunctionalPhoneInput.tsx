import React, { useEffect } from "react";

interface FunctionalPhoneInputProps {
  phone: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  refs: React.RefObject<HTMLInputElement>[];
  placeholders?: string[];
}

const FunctionalPhoneInput: React.FC<FunctionalPhoneInputProps> = ({
  phone,
  onChange,
  refs,
  placeholders = ["55", "55", "55", "5"],
}) => {
  const phoneValues = phone.map((value) => value || "");

  useEffect(() => {
    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.maxLength = index < 3 ? 2 : 1;
      }
    });
  }, [refs]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      onChange(e, index);
      if (index < 3 && value.length === 2) {
        refs[index + 1].current?.focus();
      } else if (index === 3 && value.length === 1) {
        refs[index + 1]?.current?.blur();
      }
    }
  };

  return (
    <div className="phone-inputs">
      {phoneValues.map((value, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            ref={refs[index]}
            className="phone-input"
            placeholder={placeholders[index]}
          />
          {index < phoneValues.length - 1 && <span className="dash">-</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FunctionalPhoneInput;
