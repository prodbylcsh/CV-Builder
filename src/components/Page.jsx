import '../styles/page.css'
import "../styles/forms.css"
import { PersonalDetailsSection } from "./PersonalDetails.jsx"
import { EducationSection } from "./Education.jsx"
import { SectionHeader } from "./ui/SectionHeader.jsx"
import { AddButton } from "./ui/AddButton.jsx"

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

export {
    Page,
}