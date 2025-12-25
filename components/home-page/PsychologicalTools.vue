<template>
  <!-- Psychological Tools Section with Darker Background -->
  <section class="py-20 bg-[#2C3E50]">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3498DB] to-[#9B59B6]">
          Психологические инструменты
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-[#3498DB] to-[#9B59B6] mx-auto mt-4 rounded-full"></div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="tool in psychTools" :key="tool.title"
          class="group relative bg-[#34495E] rounded-2xl p-6 shadow-lg hover:scale-105 transform transition-all duration-300">
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#3498DB]/10 to-[#9B59B6]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
          <div class="relative z-10">
            <div
              class="w-14 h-14 bg-gradient-to-br from-[#3498DB] to-[#9B59B6] rounded-lg flex items-center justify-center mb-4">
              <i :class="tool.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">
              {{ tool.title }}
            </h3>
            <p class="text-[#BDC3C7]">{{ tool.description }}</p>
            <NuxtLink :to="tool.link"
              class="inline-flex items-center text-[#3498DB] mt-4 group-hover:text-[#2980B9] transition-colors">
              Подробнее
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const psychTools = ref([
  {
    title: "Тест на эмоциональный интеллект",
    icon: "fas fa-brain",
    description:
      "Узнайте уровень вашего EQ и получите рекомендации по развитию",
    link: "/tools/eq-test",
  },
  {
    title: "Дневник настроения",
    icon: "fas fa-book-open",
    description: "Отслеживайте свои эмоции и находите паттерны поведения",
    link: "/tools/mood-tracker",
  },
  {
    title: "Медитации",
    icon: "fas fa-peace",
    description: "Коллекция guided-медитаций для различных целей",
    link: "/tools/meditations",
  },
]);
</script>

<style scoped>
/* Optional: Shadow effect on the entire section */
section {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
