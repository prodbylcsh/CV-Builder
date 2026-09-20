function FormField({ containerClass, label, name, value, onChange, as = "input", ...inputProps }) {
    const Tag = as
    return (
        <div className={containerClass + " form-field"}>
            <label htmlFor={name}>{label}</label>
            <Tag id={name} name={name} value={value} onChange={onChange} {...inputProps} />
        </div>
    )
}

export {
    FormField,
}