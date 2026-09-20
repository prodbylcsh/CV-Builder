import { useDraft } from "../hooks/useDraft.js"
import { EMPTY_EDUCATION, MAX_ENTRIES } from "../data/constants.js"
import { AddButton } from "./ui/AddButton.jsx"
import { SectionHeader } from "./ui/SectionHeader.jsx"
import { IconButton } from "./ui/IconButton.jsx"
import { FormField } from "./ui/FormField.jsx"
import { FormActions } from "./ui/FormActions.jsx"
import { useEntryList } from "../hooks/useEntryList.js"
import pencilIcon from "../assets/pencil-icon.svg"
import trashIcon from "../assets/trash-icon.svg"

export function EducationSection() {
    const { entries, editingId, handleAdd, handleEdit, handleSave, handleRemove } = useEntryList(EMPTY_EDUCATION)

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
    const { draft, handleChange } = useDraft(initial)

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

            <FormActions sectionName="education" onRemove={onRemove} />
        </form>
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