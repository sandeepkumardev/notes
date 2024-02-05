import { ActionButton, ActionButtonProps } from '@/components'
import { useStore } from '@renderer/store'
import { FaRegTrashCan } from 'react-icons/fa6'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const { deleteNote } = useStore()

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
