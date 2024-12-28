<template>
  <NuxtLink
    :to="tool.path"
    class="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <div class="relative">
      <img
        :src="tool.image"
        :alt="tool.name"
        class="w-full h-48 object-cover"
      />
    </div>

    <div class="p-6">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-800">{{ tool.name }}</h3>
      </div>

      <p class="text-gray-600 mb-4">{{ tool.description }}</p>

      <div class="flex justify-end">
        <span
          class="inline-block text-pink-500 font-medium hover:text-pink-600 transition-colors duration-300"
        >
          Открыть инструмент →
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  tool: {
    type: Object,
    required: true,
  },
});
</script>
