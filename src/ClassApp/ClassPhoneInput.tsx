import React, { useRef } from "react";

interface ClassPhoneInputProps {
  phone: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  placeholders: string[];
}

const ClassPhoneInput: React.FC<ClassPhoneInputProps> = ({
  phone,
  onChange,
  placeholders,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  return (
    <div className="phone-inputs">
      {phone.map((value, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e, index);
              if (
                e.target.value.length === placeholders[index].length &&
                inputRefs.current[index + 1]
              ) {
                inputRefs.current[index + 1].focus();
              }
            }}
            ref={(el) => (inputRefs.current[index] = el!)}
            placeholder={placeholders[index]}
            className="phone-input"
            maxLength={placeholders[index].length}
          />
          {index < phone.length - 1 && <span className="dash">-</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ClassPhoneInput;
