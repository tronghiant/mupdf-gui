<template>
  <div class="bg-white min-h-full rounded-sm mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <header>
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Merge Files</h1>
    </header>
    <main class="pt-4 flex flex-col gap-4">
      <div class="justify-end flex gap-x-2">
        <label
          class="sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white dark:disabled:text-indigo-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer"
        >
          Add files
          <input
            class="hidden"
            type="file"
            multiple
            .accept="ACCEPT_FILE_TYPE"
            @change="onInputChange"
          />
        </label>
        <button
          class="sm:w-auto py-2 px-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 dark:disabled:bg-rose-800 text-white dark:disabled:text-rose-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer"
          :disabled="!files.length"
          @click="removeAllFiles()"
        >
          Remove all
        </button>
      </div>
      <DropZone v-slot="{ dropZoneActive }" @files-dropped="addFiles">
        <div class="min-h-[200px] border-dotted border-2 border-sky-500 rounded-lg flex p-4">
          <div
            v-if="!files.length"
            class="text-xl grow flex place-content-center place-items-center"
          >
            <span v-if="dropZoneActive" class="text-xl">Drop Now</span>
            <span v-else class="text-xl">Drag Files Here</span>
          </div>
          <draggable
            v-show="files.length"
            v-model="files"
            item-key="id"
            class="flex flex-col space-y-2 w-full"
            tag="ul"
            ghost-class="ghost"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <li
                class="group/item cursor-row-resize w-full hover:bg-slate-100 rounded-sm px-2 py-1 flex justify-between"
              >
                <span>{{ element.file.name }}</span>
                <a
                  class="group/edit invisible hover:bg-slate-200 group-hover/item:visible w-4 cursor-pointer"
                  @click="removeFile(element)"
                >
                  <span class="text-black"><XMarkIcon /></span>
                </a>
              </li>
            </template>
          </draggable>
        </div>
      </DropZone>
      <div class="justify-center flex">
        <button
          class="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white dark:disabled:text-indigo-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer"
          :disabled="files.length < 2"
          @click="mergeFiles()"
        >
          <span class="text-lg">Merge</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { XMarkIcon } from '@heroicons/vue/24/solid'

import useFileList from '../compositions/file-list'
import DropZone from '../components/DropZone.vue'

const ACCEPT_FILE_TYPE = 'application/pdf'
let dragging = false
const { files, addFiles, removeFile, removeAllFiles } = useFileList(ACCEPT_FILE_TYPE)

async function mergeFiles() {
  const inputFiles = [...files.value].map((file) => (file.file as any).path) as string[]
  window.electronAPI
    .mergeFiles(inputFiles)
    .then(() => {
      window.alert('Done!')
    })
    .catch((err) => {
      window.alert(err)
    })
}
function onInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files) {
    addFiles([...target.files])
    // reset so that selecting the same file again will still cause it to fire this change
    target.value = null as any
  }
}
</script>
