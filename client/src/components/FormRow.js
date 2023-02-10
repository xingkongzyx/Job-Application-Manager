import React from "react";

const FormRow = ({
    value,
    handleChange,
    labelText,
    name,
    inputType,
}) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {/* 用于防止, label 与传入的 name 不同的情况. 所以如果传入了 labelText 就使用, 否则使用传入的name prop.  */}
                {labelText || name}
            </label>
            <input
                type={inputType}
                className="form-input"
                name={name}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default FormRow;
