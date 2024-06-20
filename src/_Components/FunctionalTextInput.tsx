import { ChangeEvent, forwardRef, Ref } from "react";

interface FunctionalTextInputProps {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FunctionalTextInput = forwardRef(
    (
        { label, name, placeholder, value, onChange }: FunctionalTextInputProps,
        ref: Ref<HTMLInputElement>
    ) => (
        <div className="input-wrap">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={ref}
            />
        </div>
    )
);

export default FunctionalTextInput;