<template>
  <section class="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold text-white mb-6">
        Готовы начать свой путь?
      </h2>
      <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
        Присоединяйтесь к нашему сообществу и начните свое путешествие к
        личностному росту уже сегодня.
      </p>
      <NuxtLink
        to="/register"
        class="inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
      >
        Присоединиться
      </NuxtLink>
    </div>
  </section>
</template>
<script setup>
// TODO: do not display if logged in
</script>
