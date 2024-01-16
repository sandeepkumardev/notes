import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  // const title = truncateTitle(selectedNote?.title)

  if (!selectedNote) return null

  return (
    <div className="flex">
      <div className={twMerge('text-center flex-1 px-3 truncate ...', className)} {...props}>
        <span className="text-gray-400">{selectedNote.title}</span>
      </div>
      <span className="min-w-[135px] bg-transparent"></span>
    </div>
  )
}
