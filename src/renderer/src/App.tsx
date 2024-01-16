import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-1">
          <ActionButtonRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-800/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
