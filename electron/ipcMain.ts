import path from 'node:path'
import { spawn } from 'node:child_process'
import { accessSync, constants } from 'node:fs'
import { ipcMain, app, dialog, SaveDialogOptions } from 'electron'

import store from './store'
import {
  IPC_APIS_MERGE_FILES,
  IPC_APIS_SET_MUTOOL_PATH,
  IPC_DIALOG_OPEN_FILE,
  IPC_GET_DESKTOP_PATH,
  PREF_MUTOOL_PATH_KEY
} from './apis.d'

export function init() {
  ipcMain.handle(IPC_GET_DESKTOP_PATH, () => app.getPath('desktop'))
  ipcMain.handle(IPC_DIALOG_OPEN_FILE, handleFileOpen)
  ipcMain.handle(IPC_APIS_MERGE_FILES, handleMergeFiles)
  ipcMain.handle(IPC_APIS_SET_MUTOOL_PATH, handleSetMutoolPath)
}

async function handleFileOpen(_: unknown, options: SaveDialogOptions) {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: path.join(app.getPath('desktop'), 'out.pdf'),
    ...options
  })
  if (!canceled) {
    return filePath
  }
}

async function handleMergeFiles(_: unknown, args: Record<string, any>) {
  const { output, inputFiles } = args || {}
  const spawnArgs = ['merge', '-o', output, ...inputFiles]

  return new Promise((resolve, reject) => {
    const error: string[] = []
    const stdout: string[] = []

    const mutool = `${store.get(PREF_MUTOOL_PATH_KEY)}` || 'mutool'
    const cmd = spawn(mutool, spawnArgs)
    cmd.stdout.on('data', (data) => {
      stdout.push(data.toString())
    })
    cmd.on('error', (e) => {
      error.push(e.toString())
    })
    cmd.on('close', () => {
      if (error.length) reject(error.join(''))
      else resolve(stdout.join(''))
    })
  })
}
async function handleSetMutoolPath(_: unknown, mutoolPath: string) {
  try {
    accessSync(mutoolPath, constants.X_OK)
    store.set(PREF_MUTOOL_PATH_KEY, mutoolPath)
  } catch {
    dialog.showErrorBox('Error', `「mutool」path is invalid `)
  }
}
