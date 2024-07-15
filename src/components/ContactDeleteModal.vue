<template>
  <ModalTemplate @close="emit('close')" v-if="deletableContact">
    <h2 class="text-2xl mb-2">Удалить контакт?</h2>
    <p class="font-semibold mb-5">Это действие необратимо.</p>
    <button
      class="rounded-md bg-red-500 px-3 py-1 w-full text-white hover:bg-red-400"
      @click="deleteContact(deletableContact.id), emit('close')"
    >
      Удалить контакт
    </button>
  </ModalTemplate>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactsStore } from '@/stores/contacts'
import { onClickOutside } from '@vueuse/core'
import type Contact from '@/interfaces/Contact'
import ModalTemplate from './base/ModalTemplate.vue'

defineProps<{
  deletableContact: Contact | null
}>()

const emit = defineEmits(['close'])
const contactsStore = useContactsStore()

const { deleteContact } = contactsStore

const modal = ref(null)
onClickOutside(modal, () => emit('close'))
</script>
