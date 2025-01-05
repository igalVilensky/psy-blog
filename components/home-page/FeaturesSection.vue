<template>
  <section class="py-20 bg-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-white mb-12">
        Наши инструменты
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors duration-300"
        >
          <i :class="feature.icon" class="text-blue-400 text-3xl mb-4"></i>
          <h3 class="text-xl font-semibold text-white mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = ref([
  {
    title: "Психологические тесты",
    icon: "fas fa-brain",
    description: "Профессиональные методики для глубокого самопознания",
  },
  {
    title: "Сообщество",
    icon: "fas fa-users",
    description: "Поддержка единомышленников на вашем пути развития",
  },
  {
    title: "Личный профиль",
    icon: "fas fa-user-circle",
    description: "Отслеживание прогресса и персональные рекомендации",
  },
]);
</script>
