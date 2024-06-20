import React, { ChangeEvent, RefObject } from "react";

interface FunctionalPhoneInputProps {
    label: string;
    phone: string[];
    onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    refs: RefObject<HTMLInputElement>[];
}

const FunctionalPhoneInput: React.FC<FunctionalPhoneInputProps> = ({
    label,
    phone,
    onChange,
    refs,
}) => {
    return (
        <div className="input-wrap">
            <label htmlFor="phone">{label}</label>
            <div id="phone-input-wrap">
                <input
                    type="text"
                    id="phone-input-1"
                    value={phone[0]}
                    onChange={(e) => onChange(e, 0)}
                    placeholder="55"
                    ref={refs[0]}
                />
                -
                <input
                    type="text"
                    id="phone-input-2"
                    value={phone[1]}
                    onChange={(e) => onChange(e, 1)}
                    placeholder="55"
                    ref={refs[1]}
                />
                -
                <input
                    type="text"
                    id="phone-input-3"
                    value={phone[2]}
                    onChange={(e) => onChange(e, 2)}
                    placeholder="55"
                    ref={refs[2]}
                />
                -
                <input
                    type="text"
                    id="phone-input-4"
                    value={phone[3]}
                    onChange={(e) => onChange(e, 3)}
                    placeholder="5"
                    ref={refs[3]}
                />
            </div>
        </div>
    );
};

export default FunctionalPhoneInput;
