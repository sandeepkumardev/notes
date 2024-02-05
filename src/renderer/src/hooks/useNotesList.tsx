import { useStore } from '@renderer/store'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const { notes, selectedNoteIndex, handleSelectedNoteIndex } = useStore()

  const handleNoteSelect = (index: number) => async () => {
    handleSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
