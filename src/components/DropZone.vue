<template>
  <div
    :data-active="active"
    @drop.prevent="onDrop"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
  >
    <!-- share state with the scoped slot -->
    <slot :drop-zone-active="active"></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Create `active` state and manage it with functions
const active = ref(false)
let inActiveTimeout: any = null // add a variable to hold the timeout key
function setActive() {
  active.value = true
  clearTimeout(inActiveTimeout) // clear the timeout
}
function setInactive() {
  // wrap it in a `setTimeout`
  inActiveTimeout = setTimeout(() => {
    active.value = false
  }, 50)
}

const emit = defineEmits<{
  'files-dropped': [files: File[]]
}>()
function onDrop(e: DragEvent) {
  if (e.dataTransfer) {
    emit('files-dropped', [...e.dataTransfer.files])
  }
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
function preventDefaults(e: Event) {
  e.preventDefault()
}
onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})
onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>
