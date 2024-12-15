<template>
  <div class="bg-gray-100 py-8 min-h-screen">
    <!-- Simulate Loading State -->
    <div v-if="isLoading" class="w-full flex justify-center items-center h-32">
      <!-- Spinner -->
      <div
        class="animate-spin mt-24 rounded-full border-t-4 border-blue-400 border-solid w-16 h-16"
      ></div>
    </div>

    <div
      v-else
      class="max-w-screen-xl w-full mx-auto flex flex-col items-center gap-8 px-4 sm:px-0"
    >
      <!-- Popular Queries Section -->
      <div class="bg-blue-400 w-full py-2 px-4 rounded-2xl">
        <h3 class="text-white text-lg font-semibold">Популярные запросы</h3>
      </div>

      <!-- Cards with Gradient Backgrounds -->
      <div class="flex w-full gap-4">
        <div
          class="bg-gradient-to-bl from-purple-500 via-pink-400 to-red-400 w-96 py-2 px-4 rounded-2xl h-32"
        >
          <div class="flex gap-8 items-center">
            <p class="text-xl font-bold text-white w-24">Любовь и отношения</p>
            <!-- Heart icon -->
            <i class="fas fa-heart text-white text-4xl"></i>
          </div>
        </div>
        <div
          class="bg-gradient-to-bl from-yellow-400 via-orange-400 to-red-400 w-96 py-2 px-4 rounded-2xl h-32"
        >
          <p class="text-xl font-bold text-white w-24">Любовь и отношения</p>

          <i class="fas fa-comments"></i>
          <!-- Comments icon -->
        </div>
      </div>

      <!-- Discounted Courses Section -->
      <div class="bg-blue-400 w-full py-2 px-4 rounded-2xl">
        <h3 class="text-white text-lg font-semibold">
          Курсы недели со скидкой
        </h3>
      </div>

      <!-- Cards with Gradient Backgrounds -->
      <div class="flex w-full gap-4">
        <div
          class="bg-gradient-to-bl from-teal-400 via-cyan-400 to-blue-500 w-96 py-2 px-4 rounded-2xl h-32"
        >
          <p class="text-xl font-bold text-white w-24">Любовь и отношения</p>
          <i class="fas fa-user"></i>
          <!-- User icon -->
        </div>
        <div
          class="bg-gradient-to-bl from-pink-500 via-violet-400 to-blue-500 w-96 py-2 px-4 rounded-2xl h-32"
        >
          <p class="text-xl font-bold text-white w-24">Любовь и отношения</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Simulate loading state
const isLoading = ref(true);

// Simulate loading for 0.5 second
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>
