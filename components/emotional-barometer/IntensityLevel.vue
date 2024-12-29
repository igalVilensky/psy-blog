<template>
  <div>
    <div class="mb-3">
      <p class="text-sm text-gray-600">
        Оцените силу вашей эмоции "{{ selectedEmotion?.name }}" от 1 до 10:
      </p>
      <ul class="text-xs text-gray-500 mt-2 space-y-1">
        <li>1-3: Слабое ощущение</li>
        <li>4-7: Умеренное влияние</li>
        <li>8-10: Сильное воздействие</li>
      </ul>
    </div>
    <input
      type="range"
      v-model="intensityLevel"
      min="1"
      max="10"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <span class="block text-center mt-2 text-sm font-medium">
      {{ intensityLevel }}/10
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectedEmotion: {
    type: Object,
    required: true,
  },
  intensityLevel: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:intensity-level"]);

const intensityLevel = ref(props.intensityLevel);

// This watch will emit an event whenever the intensityLevel changes
watch(intensityLevel, (newValue) => {
  emit("update:intensity-level", newValue);
});
</script>
