import { useState } from "react"

export function useDraft(initial) {
    const [draft, setDraft] = useState(initial)

    function handleChange(e) {
        setDraft({ ...draft, [e.target.name]: e.target.value })
    }

    return {
        draft, handleChange
    }
}