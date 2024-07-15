<template>
  <div
    class="bg-black/25 absolute left-0 top-0 z-10 w-screen h-screen flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-5 sm:min-w-[400px]" ref="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close'])

const modal = ref(null)
onClickOutside(modal, () => emit('close'))
</script>

<style scoped></style>
