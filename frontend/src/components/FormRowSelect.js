// 用于 addJob page 的Job Type 以及 Application Status dropdown
function FormRowSelect({
    name,
    labelText,
    options,
    handleChange,
    value,
}) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {/* 如果没有提供 labelText 就是用传入的 name */}
                {labelText || name}
            </label>

            <select
                name={name}
                value={value}
                onChange={handleChange}
                className="form-select"
            >
                {options.map((itemValue, index) => {
                    return (
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default FormRowSelect;
