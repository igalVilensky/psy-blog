<template>
  <div
    class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg px-3 sm:px-6 pb-6 sm:pt-6"
  >
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Оцените силу эмоции "{{ selectedEmotion?.name }}"
      </h3>
      <p class="text-sm text-gray-600">
        Передвиньте ползунок, чтобы указать интенсивность вашего переживания
      </p>
    </div>

    <!-- Intensity Categories -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="flex flex-col items-center p-3 rounded-lg bg-green-50">
        <div class="text-green-600 font-medium mb-1">Слабое</div>
        <div class="text-xs text-green-700">1-3</div>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-yellow-50">
        <div class="text-yellow-600 font-medium mb-1">Умеренное</div>
        <div class="text-xs text-yellow-700">4-7</div>
      </div>
      <div class="flex flex-col items-center p-3 rounded-lg bg-red-50">
        <div class="text-red-600 font-medium mb-1">Сильное</div>
        <div class="text-xs text-red-700">8-10</div>
      </div>
    </div>

    <!-- Slider Container -->
    <div class="relative mt-8 mb-6">
      <!-- Custom Track -->
      <div
        class="absolute w-full h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full"
      ></div>

      <!-- Actual Range Input -->
      <input
        type="range"
        v-model="intensityLevel"
        min="1"
        max="10"
        class="relative w-full h-2 bg-transparent appearance-none cursor-pointer focus:outline-none rounded-lg"
        :style="sliderStyle"
      />

      <!-- Tick Marks -->
      <div class="relative w-full h-3 mt-2">
        <template v-for="n in 10" :key="n">
          <div
            class="absolute h-3 w-px bg-gray-300"
            :style="{
              left: `${((n - 1) / 9) * 100}%`,
              transform: 'translateX(-50%)',
            }"
          ></div>
        </template>
      </div>

      <!-- Numbers -->
      <div class="relative w-full h-4 mt-1">
        <template v-for="n in 10" :key="n">
          <span
            class="absolute text-xs text-gray-500 transform -translate-x-1/2"
            :class="{ 'text-blue-600 font-medium': intensityLevel === n }"
            :style="{
              left: `${((n - 1) / 9) * 100}%`,
            }"
          >
            {{ n }}
          </span>
        </template>
      </div>
    </div>

    <!-- Current Value Display -->
    <div class="text-center">
      <span
        class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
      >
        Текущая интенсивность: {{ intensityLevel }}/10
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

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

// Custom styling for the range input thumb
const sliderStyle = computed(() => ({
  "--thumb-color": getThumbColor(intensityLevel.value),
}));

// Function to determine thumb color based on value
function getThumbColor(value) {
  if (value <= 3) return "rgb(34, 197, 94)"; // green
  if (value <= 7) return "rgb(234, 179, 8)"; // yellow
  return "rgb(239, 68, 68)"; // red
}

watch(intensityLevel, (newValue) => {
  emit("update:intensity-level", newValue);
});
</script>

<style scoped>
input[type="range"] {
  /* Remove default styles */
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

/* Remove default track */
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
}

input[type="range"]::-moz-range-track {
  background: transparent;
  border: none;
}

/* Thumb Styles */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--thumb-color, #3b82f6);
  cursor: pointer;
  margin-top: -20px; /* Adjusted to perfectly center the thumb */
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--thumb-color, #3b82f6);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

/* Hover state */
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

/* Focus state */
input[type="range"]:focus::-webkit-slider-thumb {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

input[type="range"]:focus::-moz-range-thumb {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}
</style>
