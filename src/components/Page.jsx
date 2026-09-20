import '../styles/page.css'
import "../styles/forms.css"
import { PersonalDetailsSection } from "./PersonalDetails.jsx"
import { EducationSection } from "./Education.jsx"
import { WorkExperienceSection } from './WorkExperience.jsx'

function Page() {
    return (
        <div
            className="a4-page"
        >
            <PersonalDetailsSection />
            <EducationSection />
            <WorkExperienceSection />
        </div>
    )
}

export {
    Page,
}