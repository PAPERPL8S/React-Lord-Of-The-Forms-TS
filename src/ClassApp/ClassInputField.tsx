import React, { forwardRef } from "react";

interface ClassInputFieldProps {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onBlur?: () => void;
  isSelect?: boolean;
  options?: string[];
}

const ClassInputField = forwardRef<
  HTMLInputElement & HTMLSelectElement,
  ClassInputFieldProps
>(
  (
    {
      label,
      name,
      id,
      placeholder,
      value,
      onChange,
      onBlur,
      isSelect,
      options,
    },
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
          onBlur={onBlur}
          ref={ref as React.Ref<HTMLSelectElement>}
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
          onBlur={onBlur}
          ref={ref as React.Ref<HTMLInputElement>}
          className="text-input"
        />
      )}
    </div>
  ),
);

export default ClassInputField;
