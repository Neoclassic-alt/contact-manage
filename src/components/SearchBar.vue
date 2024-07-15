<template>
  <div class="flex gap-3 border border-slate-200 px-3 py-1 rounded-lg flex-1">
    <img src="/images/search.svg" />
    <input type="text" class="w-full outline-none" placeholder="Введите имя" v-model="model" />
    <img src="/images/close.svg" v-show="model" class="cursor-pointer" @click="model = ''" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel()
</script>

<style scoped></style>
