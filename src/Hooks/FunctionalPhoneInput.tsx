import React from "react";

interface FunctionalPhoneInputProps {
  label: string;
  phone: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  refs: React.RefObject<HTMLInputElement>[];
}

const FunctionalPhoneInput: React.FC<FunctionalPhoneInputProps> = ({
  label,
  phone,
  onChange,
  refs,
}) => {
  const phoneValues = phone.map((value) => value || "");

  return (
    <div className="phone-input-container">
      <label>{label}</label>
      <div className="phone-inputs">
        <input
          type="text"
          id="phone-input-1"
          value={phoneValues[0]}
          onChange={(e) => onChange(e, 0)}
          ref={refs[0]}
          className="phone-input phone-input-1"
          title="Phone Input 1"
          placeholder="55"
        />
        -
        <input
          type="text"
          id="phone-input-2"
          value={phoneValues[1]}
          onChange={(e) => onChange(e, 1)}
          ref={refs[1]}
          className="phone-input phone-input-2"
          title="Phone Input 2"
          placeholder="55"
        />
        -
        <input
          type="text"
          id="phone-input-3"
          value={phoneValues[2]}
          onChange={(e) => onChange(e, 2)}
          ref={refs[2]}
          className="phone-input phone-input-3"
          title="Phone Input 3"
          placeholder="55"
        />
        -
        <input
          type="text"
          id="phone-input-4"
          value={phoneValues[3]}
          onChange={(e) => onChange(e, 3)}
          ref={refs[3]}
          className="phone-input phone-input-4"
          title="Phone Input 4"
          placeholder="5"
        />
      </div>
    </div>
  );
};

export default FunctionalPhoneInput;
