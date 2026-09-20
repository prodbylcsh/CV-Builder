import { MAX_ENTRIES } from "../../data/constants.js"

function SectionHeader(props) {
    return (
        <div className="sectionHeader">
            <span className="sectionName">{props.name}</span>
            <span className="sectionCount">{props.count} / {MAX_ENTRIES}</span>
        </div>
    )
}

export {
    SectionHeader,
}