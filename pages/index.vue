<template>
  <div class="bg-gray-100 py-4 min-h-screen">
    <!-- Simulate Loading State -->
    <div v-if="isLoading" class="w-full flex justify-center items-center h-32">
      <!-- Spinner -->
      <div
        class="animate-spin mt-24 rounded-full border-t-4 border-blue-400 border-solid w-16 h-16"
      ></div>
    </div>
    <div
      v-else
      class="max-w-screen-xl w-full mx-auto flex flex-col items-center gap-4 px-4 sm:px-0"
    >
      <div class="bg-blue-400 w-full py-2 px-4 rounded-2xl">
        <h3 class="text-white text-lg font-semibold">Популярные запросы</h3>
      </div>
      <!-- Cards -->
      <div class="flex w-full gap-4">
        <div class="bg-purple-400 w-96 py-2 px-4 rounded-2xl h-32">
          <p class="text-xl font-bold text-white w-24">Любовь и отношения</p>
        </div>
        <div class="bg-purple-400 w-96 py-2 px-4 rounded-2xl h-32">
          <p class="text-xl font-bold text-white w-24">Любовь и отношения</p>
        </div>
      </div>

      <div class="bg-blue-400 w-full py-2 px-4 rounded-2xl">
        <h3 class="text-white text-lg font-semibold">
          Курсы недели со скидкой
        </h3>
      </div>
    </div>
    <!-- <p class="text-lg mt-4">
      <NuxtLink to="/about" class="text-blue-600 underline hover:text-blue-800">
        Go to About Page
      </NuxtLink>
    </p> -->
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
