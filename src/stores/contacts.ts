import { ref } from 'vue'
import { defineStore } from 'pinia'
import type Contact from '@/interfaces/Contact'

export const useContactsStore = defineStore(
  'counter',
  () => {
    const contacts = ref<Contact[]>([])

    function addContact(contact: Contact) {
      contacts.value.unshift(contact)
    }

    function getContactById(id: string) {
      return contacts.value.find((c) => c.id === id)
    }

    function editContact(id: string, newContact: Contact) {
      const index = contacts.value.findIndex((c) => c.id === id)
      newContact.id = id
      contacts.value[index] = newContact
    }

    function deleteContact(id: string) {
      contacts.value = contacts.value.filter((c) => c.id !== id)
    }

    function searchContacts(query: string, field: keyof Contact = 'name') {
      return contacts.value.filter((c) => c[field].toLowerCase().includes(query.toLowerCase()))
    }

    return {
      contacts,
      addContact,
      getContactById,
      editContact,
      deleteContact,
      searchContacts
    }
  },
  {
    persist: true
  }
)
