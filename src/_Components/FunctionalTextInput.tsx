import React from "react";

interface FunctionalTextInputProps {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  ref: React.RefObject<HTMLInputElement>;
  isSelect?: boolean;
  options?: string[];
}

const FunctionalTextInput = React.forwardRef<
  HTMLInputElement,
  FunctionalTextInputProps
>(
  (
    { label, name, id, placeholder, value, onChange, isSelect, options },
    ref,
  ) => (
    <div className="input-wrap">
      <label htmlFor={id}>{label}</label>
      {isSelect ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref as any}
          className="text-input">
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          className="text-input"
        />
      )}
    </div>
  ),
);

export default FunctionalTextInput;
