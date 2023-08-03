import { ref } from 'vue'

export default function (acceptFileType: string) {
  const files = ref<UploadableFile[]>([])

  function addFiles(newFiles: File[]) {
    const newUploadableFiles = [...newFiles]
      .map((file) => uploadableFile(file))
      .filter((file) => file.file.type === acceptFileType && !fileExists(file.id))
    files.value = files.value.concat(newUploadableFiles)
  }

  function fileExists(otherId: string) {
    return files.value.some(({ id }) => id === otherId)
  }

  function removeFile(file: UploadableFile) {
    const index = files.value.indexOf(file)
    if (index > -1) files.value.splice(index, 1)
  }
  function removeAllFiles() {
    files.value = []
  }

  return { files, addFiles, removeFile, removeAllFiles }
}

function uploadableFile(file: File) {
  return {
    file,
    id: `${file.name}-${file.size}-${file.lastModified}-${file.type}`
  } as UploadableFile
}

export interface UploadableFile {
  file: File
  id: string
}
