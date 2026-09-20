import trashIcon from "../../assets/trash-icon.svg"
import checkIcon from "../../assets/check-icon.svg"

function FormActions({ sectionName, onRemove }) {
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

export {
    FormActions,
}