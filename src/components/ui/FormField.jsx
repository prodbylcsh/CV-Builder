function FormField({ containerClass, label, name, value, onChange, ...inputProps }) {
    return (
        <div className={containerClass + " form-field"}>
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} value={value} onChange={onChange} {...inputProps} />
        </div>
    )
}

export {
    FormField,
}