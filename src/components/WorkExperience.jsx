import { useDraft } from "../hooks/useDraft.js"
import { EMPTY_WORK, MAX_ENTRIES } from "../data/constants.js"
import { AddButton } from "./ui/AddButton.jsx"
import { SectionHeader } from "./ui/SectionHeader.jsx"
import { IconButton } from "./ui/IconButton.jsx"
import { FormField } from "./ui/FormField.jsx"
import { FormActions } from "./ui/FormActions.jsx"
import { useEntryList } from "../hooks/useEntryList.js"
import pencilIcon from "../assets/pencil-icon.svg"
import trashIcon from "../assets/trash-icon.svg"

export function WorkExperienceSection({ isPreview }) {
    const { entries, editingId, newId, handleAdd, handleEdit, handleSave, handleRemove } = useEntryList(EMPTY_WORK)

    const visible = isPreview ? entries.filter(e => e.id !== newId) : entries

    if (isPreview && visible.length === 0) {
        return null
    }

    return (
        <section className="cv-section work-experience-section">
            <SectionHeader name="WORK EXPERIENCE" count={entries.length} />

            {visible.map((entry, index) =>
                !isPreview && entry.id === editingId
                    ? <WorkExperienceForm
                        key={entry.id}
                        initial={entry}
                        index={index}
                        onSave={handleSave}
                        onRemove={() => handleRemove(entry.id)}
                    />
                    : <WorkExperienceEntry
                        key={entry.id}
                        entry={entry}
                        onEdit={() => handleEdit(entry.id)}
                        onRemove={() => handleRemove(entry.id)}
                    />
            )}

            {!isPreview && entries.length < MAX_ENTRIES && (
                <AddButton
                    title="Add work experience"
                    className="work-experience-button"
                    onClick={handleAdd}
                />
            )}
        </section>
    )
}

function WorkExperienceForm({ initial, index, onSave, onRemove }) {
    const { draft, handleChange } = useDraft(initial)

    return (
        <form className="work-experience-form" onSubmit={(e) => {
            e.preventDefault()
            onSave(draft)
        }
        }>
            <h4 className="section-header">WORK EXPERIENCE • ENTRY {index + 1}</h4>
            <FormField
                containerClass="company-container"
                label="Company"
                name="company"
                value={draft.company}
                onChange={handleChange}
                type="text"
                placeholder="Microsoft"
                autoComplete="on"
                required
            />

            <FormField
                containerClass="position-container"
                label="Position"
                name="position"
                value={draft.position}
                onChange={handleChange}
                type="text"
                placeholder="Software developer"
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

            <FormField
                containerClass="description-container"
                label="Description"
                name="description"
                value={draft.description}
                onChange={handleChange}
                placeholder="What were your responsibilities?"
                as="textarea"
                required
            />

            <FormActions sectionName="work-experience" onRemove={onRemove} />
        </form>
    )
}

function WorkExperienceEntry({ entry, onEdit, onRemove }) {
    return (
        <div className="work-experience-entry displaying-section">
            <div className="entry-text">
                <span className="entry-title">{entry.company}</span>
                <span className="entry-subtitle">{entry.position}</span>
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