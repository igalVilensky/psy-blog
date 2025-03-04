<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">Обновления</h2>
    <div v-for="update in updates" :key="update.id" class="mb-6">
      <h3 class="text-lg text-purple-400 mb-2">{{ update.title }}</h3>
      <p class="text-slate-300 text-sm">{{ update.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  updates: Array,
});
</script>
