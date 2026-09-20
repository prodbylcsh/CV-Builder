import { useState, useRef } from "react"
import { useClickOutside } from "../../hooks/useClickOutside.js"

function Dropdown({ label, icon, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)

    useClickOutside(ref, () => setIsOpen(false))

    return (
        <div className="dropdown" ref={ref}>
            <button type="button" className="dropdown-trigger" onClick={() => setIsOpen(o => !o)}>
                {icon}
                <span className="dropdown-label">{label}</span>
                <span className={"chevron" + (isOpen ? " open" : "")} />
            </button>

            {isOpen && (
                <div className="dropdown-panel" onClick={() => setIsOpen(false)}>
                    {children}
                </div>
            )}
        </div>
    )
}

export { Dropdown }