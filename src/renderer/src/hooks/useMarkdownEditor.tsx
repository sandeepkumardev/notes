import { saveNoteAtom, selectedNoteAtom } from '@/store'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const eidtorRef = useRef<MDXEditorMethods>(null)

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
