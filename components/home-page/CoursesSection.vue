<template>
  <section class="py-20 bg-[#ECF0F1]">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-[#2D2D2D] mb-12">
        Курсы и руководства
      </h2>
      <div
        class="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"
      ></div>
      <div class="grid md:grid-cols-3 gap-8 mt-12">
        <div
          v-for="course in courses"
          :key="course.title"
          class="group bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
        >
          <div class="aspect-w-16 aspect-h-9 bg-[#F8F9FA]"></div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-[#2D2D2D] mb-2">
              {{ course.title }}
            </h3>
            <p class="text-[#7F8C8D] mb-4">{{ course.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-[#3498DB]">{{ course.duration }}</span>
              <NuxtLink
                :to="course.link"
                class="text-[#3498DB] hover:text-[#9B59B6] transition-colors"
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

<style scoped>
/* Optional shadow to give depth to the section */
section {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
