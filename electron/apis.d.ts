export interface IElectronAPI {
  mergeFiles: (inputFiles: string[]) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

export const IPC_GET_DESKTOP_PATH = 'app:get-desktop-path'
export const IPC_DIALOG_OPEN_FILE = 'dialog:openFile'
export const IPC_APIS_MERGE_FILES = 'apis:mergeFiles'

export const MENU_EVENT_SETTING = 'event:menu-setting-clicked'
export const IPC_APIS_SET_MUTOOL_PATH = 'apis:set-mutool-path'

export const PREF_MUTOOL_PATH_KEY = 'pref:mutool_path_key'
