import { MDXEditorMethods } from '@mdxeditor/editor'
import { useStore } from '@renderer/store'
import { saveDBNote } from '@renderer/store/resolvers'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const { selectedNote, notes, handleNotes } = useStore()
  const eidtorRef = useRef<MDXEditorMethods>(null)

  const saveNote = async (content: string) => {
    if (!selectedNote || !notes) return

    await saveDBNote(selectedNote, content)

    handleNotes(
      notes.map((note) => {
        if (note.title === selectedNote.title) {
          return {
            ...note,
            lastEditTime: Date.now()
          }
        }

        return note
      })
    )
  }

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = eidtorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    eidtorRef,
    handleAutoSaving,
    handleBlur,
    selectedNote
  }
}
