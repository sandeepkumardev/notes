import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return (
    <div className="sticky top-0 bg-[#202020] draggable pr-[135px]">
      <div
        className={twMerge('text-center h-[32px] flex-1 px-3 py-1 truncate ...', className)}
        {...props}
      >
        {selectedNote ? <span className="text-gray-400">{selectedNote.title}</span> : ''}
      </div>
    </div>
  )
}
