import { useState } from "react"
import { useDraft } from "../hooks/useDraft.js"
import { EMPTY_PERSONAL } from "../data/constants.js"
import { countries } from "../data/countries.js"
import { AddButton } from "./ui/AddButton.jsx"
import { IconButton } from "./ui/IconButton.jsx"
import { FormActions } from "./ui/FormActions.jsx"
import emailIcon from "../assets/email-icon.svg"
import phoneIcon from "../assets/phone-icon.svg"
import locationIcon from "../assets/location-icon.svg"
import pencilIcon from "../assets/pencil-icon.svg"

export function PersonalDetailsSection() {
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
        <div className="personal-details-container displaying-section">
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
            <IconButton
                containerClass="edit-button"
                onClick={onEdit}
                icon={pencilIcon}
                alt="Pencil icon"
                imgClass="pencil-icon"
            />
        </div>
    )
}

function PersonalDetailsForm({ initial, onSave, onRemove }) {
    const { draft, handleChange } = useDraft(initial)

    return (
        <form className="personal-details-form" onSubmit={(e) => {
            e.preventDefault()
            onSave(draft)
        }
        }>
            <h4 className="section-header">PERSONAL DETAILS</h4>

            <FormField
                containerClass="first-name-container"
                label="First-name"
                name="firstName"
                value={draft.firstName}
                onChange={handleChange}
                type="text"
                placeholder="John"
                autoComplete="given-name"
                required
            />

            <FormField
                containerClass="last-name-container"
                label="Last name"
                name="lastName"
                value={draft.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Deer"
                autoComplete="family-name"
                required
            />

            <FormField
                containerClass="job-title-container"
                label="Current job title"
                name="jobTitle"
                value={draft.jobTitle}
                onChange={handleChange}
                type="text"
                placeholder="Software developer"
                autoComplete="organization-title"
                required
            />

            <FormField
                containerClass="email-container"
                label="E-mail"
                name="email"
                value={draft.email}
                onChange={handleChange}
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
            />

            <FormField
                containerClass="phone-number-container"
                label="Phone number"
                name="phoneNumber"
                value={draft.phoneNumber}
                onChange={handleChange}
                type="tel"
                placeholder="+420 111 222 333"
                autoComplete="tel"
                required
            />

            <FormField
                containerClass="city-container"
                label="City"
                name="city"
                value={draft.city}
                onChange={handleChange}
                type="text"
                placeholder="Prague"
                autoComplete="address-level2"
                required
            />

            <div className="country-container">
                <label htmlFor="country">Country</label>
                <select autoComplete="country" id="country" name="country"
                    value={draft.country}
                    onChange={handleChange}
                    required
                >
                    <option value="">select country</option>
                    {countries.map(c => <option key={c.code} value={c.code}>{c.country}</option>)}
                </select>
            </div>

            <FormActions sectionName="personal-details" onRemove={onRemove} />
        </form>
    )
}