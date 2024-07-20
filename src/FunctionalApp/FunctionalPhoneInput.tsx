import React from "react";

interface FunctionalPhoneInputProps {
  phone: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  placeholders: string[];
}

const FunctionalPhoneInput: React.FC<FunctionalPhoneInputProps> = ({
  phone,
  onChange,
  placeholders,
}) => {
  const phoneRefs = phone.map(() => React.createRef<HTMLInputElement>());

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
                phoneRefs[index + 1]
              ) {
                phoneRefs[index + 1].current?.focus();
              }
            }}
            ref={phoneRefs[index]}
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

export default FunctionalPhoneInput;
