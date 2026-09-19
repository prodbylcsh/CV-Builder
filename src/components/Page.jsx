import '../styles/page.css'
import "../styles/forms.css"
import { useState } from "react"
import plusIcon from '../assets/plus-icon.svg'
import checkIcon from "../assets/check-icon.svg"
import trashIcon from "../assets/trash-icon.svg"
import emailIcon from "../assets/email-icon.svg"
import locationIcon from "../assets/location-icon.svg"
import pencilIcon from "../assets/pencil-icon.svg"
import phoneIcon from "../assets/phone-icon.svg"
import { countries } from "../data/countries.js"

const EMPTY_PERSONAL = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    city: "",
    country: "",
}

function Page() {
    return (
        <div
            className="a4-page"
        >
            <PersonalDetailsSection />
            <SectionHeader
                name="EDUCATION"
            />
            <AddButton
                title="Add education"
                className="education-button"
            />
            <SectionHeader
                name="WORK EXPERIENCE"
            />
            <AddButton
                title="Add work experience"
                className="work-experience-button"
            />
        </div>
    )
}

function AddButton(props) {
    return (
        <button
            type="button"
            className={props.className}
            onClick={props.onClick}
        >
            <div className="plus-icon-container">
                <img src={plusIcon} alt="Plus icon" className="plus-icon" />
            </div>
            <span>{props.title}</span>
        </button>
    )
}

function SectionHeader(props) {
    return (
        <div className="sectionHeader">
            <span className="sectionName">{props.name}</span>
            <span className="sectionCount">0 / 4</span>
        </div>
    )
}

function PersonalDetailsForm({ initial, onSave, onRemove }) {
    const [draft, setDraft] = useState(initial)

    function handleChange(e) {
        setDraft({ ...draft, [e.target.name]: e.target.value })
    }

    return (
        <form className="personal-details-form" onSubmit={(e) => {
            e.preventDefault()
            onSave(draft)
        }
        }>
            <h4 className="section-header">PERSONAL DETAILS</h4>

            <div className="first-name-container">
                <label htmlFor="first-name">First name</label>
                <input type="text" id="first-name" placeholder="John" autoComplete="given-name" name="firstName"
                    value={draft.firstName}
                    onChange={handleChange}
                />
            </div>

            <div className="last-name-container">
                <label htmlFor="last-name">Last name</label>
                <input type="text" id="last-name" placeholder="Deer" autoComplete="family-name" name="lastName"
                    value={draft.lastName}
                    onChange={handleChange}
                />
            </div>

            <div className="job-title-container">
                <label htmlFor="job-title">Current job title</label>
                <input type="text" id="job-title" placeholder="Software developer" autoComplete="organization-title" name="jobTitle"
                    value={draft.jobTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="email-container">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="your@email.com" autoComplete="email" name="email"
                    value={draft.email}
                    onChange={handleChange}
                />
            </div>

            <div className="phone-number-container">
                <label htmlFor="phone-number">Phone number</label>
                <input type="tel" id="phone-number" placeholder="+420 111 222 333" autoComplete="tel" name="phoneNumber"
                    value={draft.phoneNumber}
                    onChange={handleChange}
                />
            </div>

            <div className="city-container">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Prague" autoComplete="address-level2" name="city"
                    value={draft.city}
                    onChange={handleChange}
                />
            </div>

            <div className="city-container">
                <label htmlFor="country">Country</label>
                <select autoComplete="country" id="country" name="country"
                    value={draft.country}
                    onChange={handleChange}
                >
                    <option value="">select country</option>
                    {countries.map(c => <option key={c.code} value={c.code}>{c.country}</option>)}
                </select>
            </div>

            <button type="button" className="remove-section remove-button remove-personal-details" onClick={onRemove}>
                <img src={trashIcon} alt="Trash icon" className="trash-icon" />
                <span>Remove</span>
            </button>

            <button type="submit" className="save-section save-button save-personal-details">
                <img src={checkIcon} alt="Check icon" className="check-icon" />
                <span>Save</span>
            </button>
        </form>
    )
}

function PersonalDetailsSection() {
    const [personal, setPersonal] = useState(EMPTY_PERSONAL);
    const [isEditing, setIsEditing] = useState(false);

    const hasData = personal.firstName !== "" || personal.lastName !== ""

    function handleSave(data) {
        setPersonal(data)
        setIsEditing(false)
    }

    function handleRemove() {
        setPersonal(EMPTY_PERSONAL)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <PersonalDetailsForm
                initial={personal}
                onSave={handleSave}
                onRemove={handleRemove}
            />
        )
    }

    if (hasData) {
        return (
            <PersonalDetailsDisplay personal={personal} onEdit={() => setIsEditing(true)} />
        )
    }

    return (
        <AddButton
            title="Add personal details"
            className="personal-details-button"
            onClick={() => setIsEditing(true)}
        />
    )
}

function PersonalDetailsDisplay({ personal, onEdit }) {
    const country = countries.find(c => c.code === personal.country)?.country;

    return (
        <div className="personal-details-container">
            <h1 className="full-name">{personal.firstName} {personal.lastName}</h1>
            <h3 className="job-title">{personal.jobTitle}</h3>
            <div className="personal-info">
                <a href={"mailto:" + personal.email} className="email-container">
                    <img src={emailIcon} alt="Email icon" className="email-icon" />
                    <span className="email">{personal.email}</span>
                </a>
                <a href={"tel:" + personal.phoneNumber} className="phone-number-container">
                    <img src={phoneIcon} alt="Phone icon" className="phone-icon" />
                    <span className="phone-number">{personal.phoneNumber}</span>
                </a>
                <a
                    href={"https://www.google.com/maps/search/?api=1&query="
                        + personal.city.replace(" ", "+")
                        + ",+" + country.replace(" ", "+")}
                    className="location-container"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={locationIcon} alt="Location icon" className="location-icon" />
                    <span className="location">{personal.city}, {country}</span>
                </a>
            </div>
            <button type="button" className="edit-button">
                <img src={pencilIcon} alt="Pencil icon" className="pencil-icon" />
            </button>
        </div>
    )
}

export {
    Page,
}