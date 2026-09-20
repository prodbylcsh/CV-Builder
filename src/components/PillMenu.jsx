import "../styles/pill-menu.css"
import fontIcon from "../assets/font-icon.svg"
import layoutIcon from "../assets/layout-icon.svg"
import eyeIcon from "../assets/eye-icon.svg"
import downloadIcon from "../assets/download-icon.svg"
import { ACCENT_PRESETS, FONTS, LAYOUTS } from "../data/constants.js"
import { Dropdown } from "./ui/Dropdown.jsx"

function PillMenu({ theme, onChange, isPreview, onTogglePreview, onDownload }) {
    return (
        <div className="pill-menu">
            <FontMenu value={theme.font} onChange={(font) => onChange({ font })} />
            <MenuSeparator />
            <AccentMenu value={theme.accent} onChange={(accent) => onChange({ accent })} />
            <MenuSeparator />
            <LayoutMenu value={theme.layout} onChange={(layout) => onChange({ layout })} />
            <MenuSeparator />
            <ThemeSwitcher value={theme.mode} onChange={(mode) => onChange({ mode })} />
            <MenuSeparator />
            <PreviewButton isPreview={isPreview} onClick={onTogglePreview} />
            <DownloadButton onClick={onDownload} />
        </div>
    )
}

function FontMenu({ value, onChange }) {
    const current = FONTS.find(f => f.key === value)

    return (
        <Dropdown label={current.name} icon={<img src={fontIcon} alt="" />}>
            <div className="panel-title">Typeface</div>
            {FONTS.map(f => (
                <button
                    key={f.key}
                    type="button"
                    className={"panel-option" + (f.key === value ? " selected" : "")}
                    onClick={() => onChange(f.key)}
                >
                    <span className="font-sample" style={{ fontFamily: `var(--font-${f.key})` }}>Aa</span>
                    <span className="option-text">
                        <span className="option-name">{f.name}</span>
                        <span className="option-desc">{f.description}</span>
                    </span>
                    {f.key === value && <span className="check">✓</span>}
                </button>
            ))}
        </Dropdown>
    )
}

function MenuSeparator() {
    return (
        <div className="menu-separator">
        </div>
    )
}

function AccentMenu({ value, onChange }) {
    return (
        <Dropdown label="Accent" icon={<span className="swatch" style={{ backgroundColor: value }} />}>
            <div className="panel-title">Accent color</div>
            <div className="swatch-row">
                {ACCENT_PRESETS.map(p => (
                    <button
                        key={p.value}
                        type="button"
                        className={"swatch swatch-option" + (p.value === value ? " selected" : "")}
                        style={{ backgroundColor: p.value }}
                        title={p.name}
                        onClick={() => onChange(p.value)}
                    />
                ))}
            </div>
            <label className="custom-row" onClick={(e) => e.stopPropagation()}>
                <input
                    type="color"
                    className="accent-color-preview"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <span>Custom</span>
                <span className="hex">{value.toUpperCase()}</span>
            </label>
        </Dropdown>
    )
}

function LayoutMenu({ value, onChange }) {
    const current = LAYOUTS.find(l => l.key === value)

    return (
        <Dropdown label={current.name} icon={<img src={layoutIcon} alt="" />}>
            <div className="panel-title">Layout</div>
            <div className="layout-row">
                {LAYOUTS.map(l => (
                    <button
                        key={l.key}
                        type="button"
                        className={"layout-option" + (l.key === value ? " selected" : "")}
                        onClick={() => onChange(l.key)}
                    >
                        <span className={"layout-thumb thumb-" + l.key}>
                            <i /><i /><i /><i />
                        </span>
                        <span>{l.name}</span>
                    </button>
                ))}
            </div>
        </Dropdown>
    )
}

function ThemeSwitcher({ value, onChange }) {
    return (
        <div className="theme-switch-menu">
            <label className="theme-switch">
                <input
                    type="checkbox"
                    className="themeToggle"
                    checked={value === "dark"}
                    onChange={(e) => onChange(e.target.checked ? "dark" : "light")}
                />

                <span className="theme-option light">
                    <span className="light-icon"></span>
                    <span className="light-text">
                        Light
                    </span>
                </span>

                <span className="theme-option dark">
                    <span className="dark-icon"></span>
                    <span className="dark-text">
                        Dark
                    </span>
                </span>
            </label>
        </div>
    )
}

function PreviewButton({ isPreview, onClick }) {
    return (
        <button
            type="button"
            className={"preview-button" + (isPreview ? " active" : "")}
            onClick={onClick}
        >
            <img src={eyeIcon} alt="Eye icon" className="eye-icon" />
            <span>{isPreview ? "Edit" : "Preview"}</span>
        </button>
    )
}

function DownloadButton({ onClick }) {
    return (
        <button type="button" className="download-button" onClick={onClick}>
            <img src={downloadIcon} alt="Download icon" className="download-icon" />
            <span className="download-text">Download PDF</span>
        </button>
    )
}

export {
    PillMenu,
}