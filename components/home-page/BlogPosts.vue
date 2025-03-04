<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">Последние статьи</h2>
    <div v-for="post in posts" :key="post.id" class="mb-6">
      <h3 class="text-lg text-sky-400 mb-2">{{ post.title }}</h3>
      <p class="text-slate-300 text-sm mb-2">{{ post.excerpt }}</p>
      <button class="text-sky-400 text-sm hover:text-sky-300">
        Читать далее <i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: Array,
});
</script>
