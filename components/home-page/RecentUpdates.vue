<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold text-white mb-6">Обновления</h2>
    <div class="space-y-6">
      <div
        v-for="update in updates"
        :key="update.id"
        class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
      >
        <h3 class="text-lg text-purple-400 mb-2">{{ update.title }}</h3>
        <p class="text-slate-300 text-sm">{{ update.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  updates: Array,
});
</script>
