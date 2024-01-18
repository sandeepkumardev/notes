import { useRef } from 'react'
import {
  ActionButtonRow,
  Content,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <RootLayout>
      <Sidebar className="p-1">
        <ActionButtonRow className="flex justify-between h-[32px]" />
        <NotePreviewList className="h-[calc(100vh-40px)] overflow-auto" onSelect={resetScroll} />
      </Sidebar>
      <Content ref={contentContainerRef} className="border-l bg-zinc-800/50 border-l-white/20">
        <FloatingNoteTitle />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  )
}

export default App
