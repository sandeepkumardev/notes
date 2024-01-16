import { error } from 'console'
import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new error('contextIsolation must be enabled in the BrowserWindow!')
}

try {
  contextBridge.exposeInMainWorld('context', {})
} catch (error) {
  console.error(error)
}
