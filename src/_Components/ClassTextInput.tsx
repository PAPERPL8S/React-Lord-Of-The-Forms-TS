import React, { Component } from "react";

interface ClassTextInputProps {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isSelect?: boolean;
  options?: string[];
}

class ClassTextInput extends Component<ClassTextInputProps> {
  render() {
    const { label, name, id, placeholder, value, onChange, isSelect, options } =
      this.props;

    return (
      <div className="input-wrap">
        <label htmlFor={id}>{label}</label>
        {isSelect ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
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
            className="text-input"
          />
        )}
      </div>
    );
  }
}

export default ClassTextInput;
