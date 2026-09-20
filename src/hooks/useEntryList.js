import { useState } from "react"

export function useEntryList(emptyEntry) {
    const [entries, setEntries] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [newId, setNewId] = useState(null)

    function withoutUnsaved(list) {
        return newId === null ? list : list.filter(e => e.id !== newId)
    }

    function handleAdd() {
        const entry = { ...emptyEntry, id: crypto.randomUUID() }
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

    return {
        entries,
        editingId,
        newId,
        handleAdd,
        handleEdit,
        handleSave,
        handleRemove
    }
}