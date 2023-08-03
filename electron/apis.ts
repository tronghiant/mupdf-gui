import { ipcRenderer } from 'electron'
import smalltalk from 'smalltalk'
import {
  MENU_EVENT_SETTING,
  IPC_APIS_MERGE_FILES,
  IPC_DIALOG_OPEN_FILE,
  IPC_APIS_SET_MUTOOL_PATH
} from './apis.d'
import type { IElectronAPI } from './apis.d'

export default {
  async mergeFiles(inputFiles: string[]) {
    const outputFile = await saveAs()
    return mergeFiles(outputFile, inputFiles)
  }
} satisfies IElectronAPI

function saveAs() {
  const options = {
    title: 'Save as...',
    filters: [{ extensions: ['.pdf'] }]
  }
  return ipcRenderer.invoke(IPC_DIALOG_OPEN_FILE, options) as Promise<string>
}

async function mergeFiles(output: string, inputFiles: string[]) {
  return ipcRenderer.invoke(IPC_APIS_MERGE_FILES, { output, inputFiles }) as Promise<void>
}

export async function handleMenuEvents() {
  ipcRenderer.on(MENU_EVENT_SETTING, async (...args) => {
    showMutoolPathPrompt(args?.[1])
  })
}

async function showMutoolPathPrompt(currentPath = '/opt/homebrew/bin/mutool') {
  const path = await smalltalk.prompt('「mutool」path', '', currentPath)
  return ipcRenderer.invoke(IPC_APIS_SET_MUTOOL_PATH, path) as Promise<void>
}
