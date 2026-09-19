import "../styles/pill-menu.css"
import fontIcon from "../assets/font-icon.svg"
import layoutIcon from "../assets/layout-icon.svg"
import eyeIcon from "../assets/eye-icon.svg"
import downloadIcon from "../assets/download-icon.svg"

function PillMenu() {
    return (
        <div className="pill-menu">
            <FontMenu />
            <MenuSeparator />
            <AccentMenu />
            <MenuSeparator />
            <LayoutMenu />
            <MenuSeparator />
            <ThemeSwitcher />
            <MenuSeparator />
            <PreviewButton />
            <DownloadButton />
        </div>
    )
}

function FontMenu(props) {
    return (
        <div className="font-name-menu">
            <img src={fontIcon} alt="Plus icon" className="font-icon" />
            <select className="font-picker">
                <option value="inter">Inter</option>
                <option value="lato">Lato</option>
                <option value="noto">Noto Sans</option>
            </select>
        </div>
    )
}

function MenuSeparator(props) {
    return (
        <div className="menu-separator">
        </div>
    )
}

function AccentMenu(props) {
    return (
        <div className="accent-color-menu">
            <div className="accent-color-picker-container">
                <input className="accent-color-preview" type="color" value="#ffffff" disabled />
            </div>
            <select className="accent-color-picker">
                <option value="brown">Brown</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="custom">Custom</option>
            </select>
        </div>
    )
}

function LayoutMenu(props) {
    return (
        <div className="layout-menu">
            <img src={layoutIcon} alt="Layout icon" className="layout-icon" />
            <select className="accent-color-picker">
                <option value="classic">Classic</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    )
}

function ThemeSwitcher(props) {
    return (
        <div className="theme-switch-menu">
            <label className="theme-switch">
                <input type="checkbox" className="themeToggle" />

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

function PreviewButton(props) {
    return (
        <button type="button" className="preview-button">
            <img src={eyeIcon} alt="Eye icon" className="eye-icon" />
            <span>Preview</span>
        </button>
    )
}

function DownloadButton(props) {
    return (
        <button type="button" className="download-button">
            <img src={downloadIcon} alt="Download icon" className="download-icon" />
            <span className="download-text">Download PDF</span>
        </button>
    )
}

export {
    PillMenu,
}