<template>
  <section class="py-20 bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-white mb-12">
        Курсы и руководства
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="course in courses"
          :key="course.title"
          class="group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
        >
          <div class="aspect-w-16 aspect-h-9 bg-gray-700"></div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ course.title }}
            </h3>
            <p class="text-gray-400 mb-4">{{ course.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-blue-400">{{ course.duration }}</span>
              <NuxtLink
                :to="course.link"
                class="text-blue-400 hover:text-blue-300"
              >
                Подробнее →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const courses = ref([
  {
    title: "Эмоциональный интеллект",
    description: "Развитие навыков понимания и управления эмоциями",
    image: "/images/stress-management.jpg",
    duration: "8 недель",
    link: "/courses/emotional-intelligence",
  },
  {
    title: "Стресс-менеджмент",
    description: "Техники управления стрессом и тревожностью",
    image: "/images/stress-management.jpg",
    duration: "6 недель",
    link: "/courses/stress-management",
  },
  {
    title: "Личная эффективность",
    description: "Методики повышения продуктивности и достижения целей",
    image: "/images/personal-effectiveness.jpg",
    duration: "10 недель",
    link: "/courses/personal-effectiveness",
  },
]);
</script>
