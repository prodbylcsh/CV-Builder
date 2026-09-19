import '../styles/page.css'
import plusIcon from '../assets/plus-icon.svg'

function Page() {
    return (
        <div
            className="a4-page"
        >
            <AddButton
                title="Add personal details"
            />
            <SectionHeader
                name="EDUCATION"
            />
            <AddButton
                title="Add education"
            />
            <SectionHeader
                name="WORK EXPERIENCE"
            />
            <AddButton
                title="Add work experience"
            />
        </div>
    )
}

function AddButton(props) {
    return (
        <button
            type="button"
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

export {
    Page,
}