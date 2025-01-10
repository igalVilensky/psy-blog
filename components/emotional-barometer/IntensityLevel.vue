<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="mb-8 text-center">
      <h2 class="text-2xl text-white/90 font-medium mb-3">
        Оцените силу эмоции "{{ selectedEmotion?.name }}"
      </h2>
      <p class="text-slate-300 text-lg">
        Передвиньте ползунок, чтобы указать интенсивность вашего переживания
      </p>
    </div>

    <!-- Intensity Categories -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div
        class="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40"
      >
        <div class="text-green-400 font-medium mb-1">Слабое</div>
        <div class="text-xs text-green-300/80">1-3</div>
      </div>
      <div
        class="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40"
      >
        <div class="text-yellow-400 font-medium mb-1">Умеренное</div>
        <div class="text-xs text-yellow-300/80">4-7</div>
      </div>
      <div
        class="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40"
      >
        <div class="text-red-400 font-medium mb-1">Сильное</div>
        <div class="text-xs text-red-300/80">8-10</div>
      </div>
    </div>

    <!-- Slider Container -->
    <div class="relative mt-8 mb-6">
      <!-- Custom Track -->
      <div
        class="absolute w-full h-2 bg-gradient-to-r from-green-500/50 via-yellow-500/50 to-red-500/50 rounded-full"
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
            class="absolute h-3 w-px bg-[#0EA5E9]/30"
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
            class="absolute text-xs transform -translate-x-1/2"
            :class="{
              'text-[#0EA5E9] font-medium': intensityLevel === n,
              'text-slate-400/50': intensityLevel !== n,
            }"
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
        class="inline-flex items-center px-6 py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 text-[#0EA5E9] text-sm font-medium"
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
  if (value <= 3) return "rgb(74, 222, 128)"; // green-400
  if (value <= 7) return "rgb(250, 204, 21)"; // yellow-400
  return "rgb(248, 113, 113)"; // red-400
}

watch(intensityLevel, (newValue) => {
  emit("update:intensity-level", newValue);
});
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

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

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: var(--thumb-color);
  cursor: pointer;
  margin-top: -22px;
  border: 3px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

input[type="range"]::-moz-range-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: var(--thumb-color);
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

input[type="range"]::-webkit-slider-thumb:hover,
input[type="range"]::-webkit-slider-thumb:focus {
  transform: scale(1.15);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-moz-range-thumb:hover,
input[type="range"]::-moz-range-thumb:focus {
  transform: scale(1.15);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}
</style>
