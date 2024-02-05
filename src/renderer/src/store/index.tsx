import { NoteInfo } from '@shared/models'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { createDBNote, deleteDBNote, loadDBNotes, readDBNote } from './resolvers'

type StoreProps = {
  children: ReactNode
}

type Store = {
  selectedNoteIndex: number | null
  selectedNote: NoteInfo | null
  notes: NoteInfo[]
  handleNotes: (newNotes: NoteInfo[]) => void
  handleSelectedNoteIndex: (index: number) => void
  createEmptyNote: () => Promise<void>
  deleteNote: () => Promise<void>
}

//@ts-ignore
export const AppStore = createContext<Store>(null)
export const useStore = (): Store => useContext(AppStore)

const StoreProvider = ({ children }: StoreProps) => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null)
  const [selectedNote, setSelectedNote] = useState<NoteInfo | null>(null)
  const [notes, setNotes] = useState<NoteInfo[]>([])

  const handleSelectedNoteIndex = async (index: number) => {
    setSelectedNoteIndex(index)
    const selectedNote = notes[index]

    //read note
    const note = await readDBNote(selectedNote)
    setSelectedNote(note)
  }

  const handleNotes = (newNotes: NoteInfo[]) => {
    setNotes(newNotes)
  }

  const createEmptyNote = async () => {
    const newNote = await createDBNote()
    if (newNote) {
      setNotes([newNote, ...notes])
      setSelectedNote(newNote)
      setSelectedNoteIndex(0)
    }
  }

  const deleteNote = async () => {
    const res = await deleteDBNote(notes, selectedNote)
    if (!res) return

    const nl = notes.filter((n) => n.title !== selectedNote?.title)
    setNotes(nl)
    setSelectedNote(null)
    setSelectedNoteIndex(null)
  }

  // fetch all notes
  useEffect(() => {
    async function getNotes() {
      const notes = await loadDBNotes()
      setNotes(notes)
    }
    getNotes()
  }, [])

  return (
    <AppStore.Provider
      value={{
        selectedNoteIndex,
        selectedNote,
        notes,
        handleNotes,
        handleSelectedNoteIndex,
        createEmptyNote,
        deleteNote
      }}
    >
      {children}
    </AppStore.Provider>
  )
}

export default StoreProvider
