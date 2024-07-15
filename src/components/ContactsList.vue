<template>
  <TransitionGroup name="list" v-if="showContacts.length" class="w-full" tag="div">
    <div v-for="contact in showContacts" :key="contact.id">
      <div
        class="border border-slate-200 rounded-lg py-6 px-10 flex flex-col gap-3 mb-5 justify-between sm:flex-row"
      >
        <div class="flex flex-col gap-3">
          <div class="font-semibold text-xl truncate">{{ contact.name }}</div>
          <div>
            <div class="truncate">{{ contact.email }}</div>
            <div>{{ contact.phone }}</div>
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <button
            class="p-3 bg-blue-100 rounded-lg hover:bg-slate-100 min-w-[40px]"
            @click="changeModal('edit', contact)"
          >
            <img src="/images/pencil.svg" alt="Редактировать" title="Редактировать" />
          </button>
          <button
            class="p-3 bg-red-100 rounded-lg hover:bg-red-50 min-w-[40px]"
            @click="changeModal('delete', contact)"
          >
            <img src="/images/trash.svg" alt="Удалить" title="Удалить" />
          </button>
        </div>
      </div>
    </div>
  </TransitionGroup>
  <div v-else class="border border-slate-200 rounded-lg py-6 px-10 flex flex-col items-center">
    <p v-if="!contacts.length">Список контактов пуст</p>
    <p v-else>Нет контактов, удовлетворяющих результатам поиска</p>
  </div>
  <ContactForm
    v-if="isEditModalOpened"
    :initialContact="editingContact"
    @close="changeModal('edit', null)"
  />
  <ContactDeleteModal
    v-if="isDeleteModalOpened"
    :deletableContact="deletingContact"
    @close="changeModal('delete', null)"
  />
</template>

<script setup lang="ts">
import { useContactsStore } from '@/stores/contacts'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import type Contact from '@/interfaces/Contact'
import ContactForm from '@/components/ContactForm.vue'
import ContactDeleteModal from '@/components/ContactDeleteModal.vue'

const props = defineProps<{
  query: string
}>()

const contactsStore = useContactsStore()

const { contacts } = storeToRefs(contactsStore)

const { searchContacts } = contactsStore

const showContacts = computed(() => {
  if (props.query) {
    return searchContacts(props.query)
  } else {
    return contacts.value
  }
})

const editingContact = ref<Contact | null>(null)
const deletingContact = ref<Contact | null>(null)

const isEditModalOpened = ref(false)
const isDeleteModalOpened = ref(false)

function changeModal(modal: 'edit' | 'delete', value: Contact | null) {
  if (modal === 'edit') {
    editingContact.value = value
    isEditModalOpened.value = !!value
  } else if (modal === 'delete') {
    deletingContact.value = value
    isDeleteModalOpened.value = !!value
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
