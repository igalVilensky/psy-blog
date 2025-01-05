<template>
  <!-- Bright Section for Tools (Brighter than Previous Section) -->
  <section class="py-20 bg-[#F8F9FA]">
    <div class="container mx-auto px-4">
      <!-- Title with Underline Effect -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3498DB] to-[#9B59B6]"
        >
          Наши инструменты
        </h2>
        <div
          class="w-20 h-1 bg-gradient-to-r from-[#3498DB] to-[#9B59B6] mx-auto mt-4 rounded-full"
        ></div>
      </div>

      <!-- Cards for Features -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 bg-[#ECEFF1] rounded-xl hover:bg-[#CFD8DC] transition-colors duration-300 shadow-md"
        >
          <i :class="feature.icon" class="text-[#3498DB] text-3xl mb-4"></i>
          <h3 class="text-xl font-semibold text-[#2D2D2D] mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-[#7F8C8D]">{{ feature.description }}</p>
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

<style scoped>
/* Optional shadow for the section */
section {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
</style>
