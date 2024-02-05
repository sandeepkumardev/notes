import { NoteInfo } from '@shared/models'

export const loadDBNotes = async () => {
  const notes = await window.context.getNotes()

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const createDBNote = async () => {
  const title = await window.context.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    title,
    content: '## ',
    lastEditTime: Date.now()
  }

  return newNote
}

export const deleteDBNote = async (notes: NoteInfo[], selectedNote: NoteInfo | null) => {
  if (!selectedNote || !notes) return null

  return await window.context.deleteNote(selectedNote.title)
}

export const readDBNote = async (selectedNote: NoteInfo) => {
  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
}

export const saveDBNote = async (selectedNote: NoteInfo, newContent: string) => {
  await window.context.writeNote(selectedNote.title, newContent)
}
