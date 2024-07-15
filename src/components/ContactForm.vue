<template>
  <ModalTemplate @close="emit('close')">
    <h2 class="text-2xl mb-5">{{ isEdit ? 'Редактирование контакта' : 'Создание контакта' }}</h2>
    <!-- @vue-ignore -->
    <Form @submit="submit" v-slot="{ errors }">
      <div class="mb-3">
        <p class="font-semibold mb-1">Имя <span class="text-red-500">*</span></p>
        <Field
          name="name"
          class="border border-slate-200 rounded-md py-1 px-2 w-full"
          v-model="contact.name"
          rules="required"
          :class="{ 'border-red-500': errors?.name }"
          maxlength="40"
        />
        <ErrorMessage name="name" class="text-sm" />
      </div>
      <div class="mb-3">
        <p class="font-semibold mb-1">Телефон <span class="text-red-500">*</span></p>
        <Field
          name="phone"
          class="border border-slate-200 rounded-md py-1 px-2 w-full"
          v-model="contact.phone"
          rules="required"
          :class="{ 'border-red-500': errors?.phone }"
          maxlength="15"
        />
        <ErrorMessage name="phone" class="text-sm" />
      </div>
      <div class="mb-5">
        <p class="font-semibold mb-1">E-mail <span class="text-red-500">*</span></p>
        <Field
          name="email"
          class="border border-slate-200 rounded-md py-1 px-2 w-full"
          v-model="contact.email"
          rules="required|email"
          :class="{ 'border-red-500': errors?.email }"
          maxlength="40"
        />
        <ErrorMessage name="email" class="text-sm" />
      </div>
      <button class="rounded-md bg-slate-200 px-3 py-1 w-full hover:bg-slate-100">
        {{ isEdit ? 'Изменить контакт' : 'Создать контакт' }}
      </button>
    </Form>
  </ModalTemplate>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate'
import { useContactsStore } from '@/stores/contacts'
import type Contact from '@/interfaces/Contact'
import ModalTemplate from '@/components/base/ModalTemplate.vue'

const props = defineProps<{
  initialContact?: Contact | null
}>()

const emit = defineEmits(['close'])

defineRule('required', (value: string) => {
  if (value && value.trim()) {
    return true
  }
  return 'Поле обязательно для заполнения'
})

defineRule('email', (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(value)) {
    return true
  }
  return 'Неверный формат email'
})

const contact = ref<Contact>({
  id: '',
  name: '',
  phone: '',
  email: ''
})

onMounted(() => {
  if (props.initialContact) {
    contact.value = { ...props?.initialContact }
  }
})

const isEdit = computed(() => props?.initialContact)

const contactsStore = useContactsStore()

const { addContact, editContact } = contactsStore

function submit(value: Contact) {
  if (isEdit.value) {
    editContact(contact.value.id, value)
  } else {
    value.id = Date.now().toString() // для теста
    addContact(value)
  }
  emit('close')
}
</script>
