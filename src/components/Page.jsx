import '../styles/page.css'
import "../styles/forms.css"
import { PersonalDetailsSection } from "./PersonalDetails.jsx"
import { EducationSection } from "./Education.jsx"
import { WorkExperienceSection } from './WorkExperience.jsx'

function Page({ theme, isPreview }) {
    const classes = ["a4-page"]

    if (isPreview) {
        classes.push("preview", `font-${theme.font}`, `layout-${theme.layout}`, theme.mode)
    }

    return (
        <div
            className={classes.join(" ")}
        >
            <PersonalDetailsSection isPreview={isPreview} />
            <div className="cv-body">
                <EducationSection isPreview={isPreview} />
                <WorkExperienceSection isPreview={isPreview} />
            </div>
        </div>
    )
}

export {
    Page,
}