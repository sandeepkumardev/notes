import { appDirectoryName, fileEncoding, welcomeNoteFileName } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((filename) => filename.endsWith('.md'))

  if (isEmpty(notes)) {
    // console.info('No notes found!')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    const filePath = path.join(rootDir, welcomeNoteFileName)

    await writeFile(filePath, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFileName)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${fileName}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()

  // console.info(`writing note: ${fileName}`)

  return writeFile(`${rootDir}/${fileName}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    // console.info('Note creation canceled!')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  // if (fileName)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed!',
      message: `All notes must be saved under ${rootDir}. Avoid using other directories.`
    })

    return false
  }

  // console.info(`Creating note: ${filePath}`)

  await writeFile(filePath, '')

  return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${fileName}`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 0,
    cancelId: 1
  })

  if (response === 1) {
    // console.info('Note deletion cancled!')
    return false
  }

  // console.info('Deleting note: ', fileName)

  const filePath = path.join(rootDir, `${fileName}.md`)

  await remove(filePath)

  return true
}
