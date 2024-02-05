import { ActionButton, ActionButtonProps } from '@/components'
import { useStore } from '@renderer/store'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const { createEmptyNote } = useStore()

  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
