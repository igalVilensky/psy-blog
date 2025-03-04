<template>
  <div class="mt-12">
    <h2 class="text-2xl font-bold text-white mb-6 text-center">
      Истории успеха
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="story in stories"
        :key="story.id"
        class="bg-white/5 p-6 rounded-xl"
      >
        <p class="text-slate-300 italic mb-2">"{{ story.quote }}"</p>
        <p class="text-sky-400 text-sm">{{ story.author }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stories: Array,
});
</script>
