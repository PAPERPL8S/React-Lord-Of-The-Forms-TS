import React from "react";

interface ClassPhoneInputProps {
  phone: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  refs: React.RefObject<HTMLInputElement>[];
  placeholders: string[];
}

const ClassPhoneInput: React.FC<ClassPhoneInputProps> = ({
  phone,
  onChange,
  refs,
  placeholders,
}) => {
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
                refs[index + 1]
              ) {
                refs[index + 1].current?.focus();
              }
            }}
            ref={refs[index]}
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
