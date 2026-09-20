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
import { useDraft } from "../hooks/useDraft.js"

const EMPTY_PERSONAL = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
}

const EMPTY_EDUCATION = { id: "", school: "", degree: "", from: "", to: "" }
const MAX_ENTRIES = 4

function Page() {
    return (
        <div
            className="a4-page"
        >
            <PersonalDetailsSection />
            <EducationSection />
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
            className={props.className + " " + "add-button"}
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
            <span className="sectionCount">{props.count} / {MAX_ENTRIES}</span>
        </div>
    )
}

function PersonalDetailsForm({ initial, onSave, onRemove }) {
    useDraft(initial)

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
                    required
                />
            </div>

            <div className="last-name-container">
                <label htmlFor="last-name">Last name</label>
                <input type="text" id="last-name" placeholder="Deer" autoComplete="family-name" name="lastName"
                    value={draft.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="job-title-container">
                <label htmlFor="job-title">Current job title</label>
                <input type="text" id="job-title" placeholder="Software developer" autoComplete="organization-title" name="jobTitle"
                    value={draft.jobTitle}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="email-container">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="your@email.com" autoComplete="email" name="email"
                    value={draft.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="phone-number-container">
                <label htmlFor="phone-number">Phone number</label>
                <input type="tel" id="phone-number" placeholder="+420 111 222 333" autoComplete="tel" name="phoneNumber"
                    pattern="\+[0-9]{1,3}( [0-9]{2,4}){2,4}"
                    value={draft.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="city-container">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Prague" autoComplete="address-level2" name="city"
                    value={draft.city}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="city-container">
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

            <FormActions sectionName="personal-details" />
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

function IconButton({ containerClass, onClick, icon, alt, imgClass }) {
    return (
        <button type="button" className={containerClass} onClick={onClick}>
            <img src={icon} alt={alt} className={imgClass} />
        </button>
    )
}

function EducationSection() {
    const [entries, setEntries] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [newId, setNewId] = useState(null)

    function withoutUnsaved(list) {
        return newId === null ? list : list.filter(e => e.id !== newId)
    }

    function handleAdd() {
        const entry = { ...EMPTY_EDUCATION, id: crypto.randomUUID() }
        setEntries(prev => [...withoutUnsaved(prev), entry])
        setEditingId(entry.id)
        setNewId(entry.id)
    }

    function handleEdit(id) {
        setEntries(prev => withoutUnsaved(prev))
        setEditingId(id)
        setNewId(null)
    }

    function handleSave(updated) {
        setEntries(prev => prev.map(e => e.id === updated.id ? updated : e))
        setEditingId(null)
        setNewId(null)
    }

    function handleRemove(id) {
        setEntries(prev => withoutUnsaved(prev).filter(e => e.id !== id))
        setEditingId(null)
        setNewId(null)
    }

    return (
        <>
            <SectionHeader name="EDUCATION" count={entries.length} />

            {entries.map((entry, index) =>
                entry.id === editingId
                    ? <EducationForm
                        key={entry.id}
                        initial={entry}
                        index={index}
                        onSave={handleSave}
                        onRemove={() => handleRemove(entry.id)}
                    />
                    : <EducationEntry
                        key={entry.id}
                        entry={entry}
                        onEdit={() => handleEdit(entry.id)}
                        onRemove={() => handleRemove(entry.id)}
                    />
            )}

            {entries.length < MAX_ENTRIES && (
                <AddButton
                    title="Add education"
                    className="education-button"
                    onClick={handleAdd}
                />
            )}
        </>
    )
}

function EducationForm({ initial, index, onSave, onRemove }) {
    useDraft(initial)

    return (
        <form className="education-form" onSubmit={(e) => {
            e.preventDefault()
            onSave(draft)
        }
        }>
            <h4 className="section-header">EDUCATION • ENTRY {index + 1}</h4>
            <FormField
                containerClass="school-container"
                label="School"
                name="school"
                value={draft.school}
                onChange={handleChange}
                type="text"
                placeholder="Charles University"
                autoComplete="on"
                required
            />

            <FormField
                containerClass="degree-container"
                label="Title of study"
                name="degree"
                value={draft.degree}
                onChange={handleChange}
                type="text"
                placeholder="Phd., Computer Science"
                autoComplete="on"
                required
            />

            <FormField
                containerClass="from-container"
                label="From"
                name="from"
                value={draft.from}
                onChange={handleChange}
                type="text"
                placeholder="2022"
                inputMode="numeric"
                autoComplete="on"
                required
            />

            <FormField
                containerClass="to-container"
                label="To"
                name="to"
                value={draft.to}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                placeholder="Present"
                autoComplete="on"
                required
            />

            <FormActions sectionName="education" />
        </form>
    )
}

function FormActions({ sectionName }) {
    return (
        <>
            <button type="button" className={"remove-section remove-button remove-" + sectionName} onClick={onRemove}>
                <img src={trashIcon} alt="Trash icon" className="trash-icon" />
                <span>Remove</span>
            </button>

            <button type="submit" className={"save-section save-button save-" + sectionName}>
                <img src={checkIcon} alt="Check icon" className="check-icon" />
                <span>Save</span>
            </button>
        </>
    )
}

function EducationEntry({ entry, onEdit, onRemove }) {
    return (
        <div className="education-entry displaying-section">
            <div className="entry-text">
                <span className="entry-title">{entry.school}</span>
                <span className="entry-subtitle">{entry.degree}</span>
            </div>
            <div className="entry-dates-container">
                <span className="entry-dates">{entry.from} - {entry.to}</span>
                <IconButton
                    containerClass="edit-button"
                    onClick={onEdit}
                    icon={pencilIcon}
                    alt="Pencil icon"
                    imgClass="pencil-icon"
                />
                <IconButton
                    containerClass="remove-button"
                    onClick={onRemove}
                    icon={trashIcon}
                    alt="Trash icon"
                    imgClass="trash-icon"
                />
            </div>
        </div>
    )
}

function FormField({ containerClass, label, name, value, onChange, ...inputProps }) {
    return (
        <div className={{ containerClass } + " form-field"}>
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} value={value} onChange={onChange} {...inputProps} />
        </div>
    )
}

export {
    Page,
}