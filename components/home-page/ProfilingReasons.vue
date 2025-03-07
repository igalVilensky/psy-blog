<template>
  <section class="pb-20 px-4 relative overflow-hidden">
    <div class="container mx-auto max-w-4xl relative z-10">
      <h2 class="text-2xl font-bold text-white mb-6 sm:text-center">
        Почему важно знать свой психологический профиль?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="reason in reasons"
          :key="reason.id"
          class="bg-white/5 p-6 rounded-xl"
        >
          <h3 class="text-lg text-cyan-300 mb-2">{{ reason.title }}</h3>
          <p class="text-slate-300 text-sm">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  reasons: Array,
});
</script>
