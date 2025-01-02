<template>
  <div class="mb-6">
    <div class="flex justify-between mb-2">
      <span class="text-sm text-gray-600">Шаг {{ currentStep }}/5</span>
      <span class="text-sm text-gray-600">{{ stepTitle }}</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-[#FF6B6B] h-2 rounded-full transition-all duration-300"
        :style="{ width: `${(currentStep / 5) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  stepTitle: {
    type: String,
    required: true,
  },
});
</script>
