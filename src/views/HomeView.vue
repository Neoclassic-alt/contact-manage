<template>
  <h2 class="text-3xl mb-5">Список контактов</h2>
  <div class="flex flex-col gap-3 mb-5 sm:flex-row">
    <button
      class="bg-green-400 rounded-md text-white px-3 py-1 hover:bg-green-300"
      @click="isOpened = true"
    >
      Добавить контакт
    </button>
    <SearchBar v-model="query" />
  </div>
  <ContactsList :query="query" />
  <ContactForm v-if="isOpened" @close="isOpened = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactsList from '@/components/ContactsList.vue'
import SearchBar from '@/components/SearchBar.vue'
import ContactForm from '@/components/ContactForm.vue'

const isOpened = ref(false)
const query = ref('')
</script>
