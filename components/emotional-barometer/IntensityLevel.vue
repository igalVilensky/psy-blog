<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Header section remains the same -->
    <div class="my-4 md:mb-8 text-center">
      <p class="text-slate-300 text-base md:text-lg">
        Передвиньте ползунок, чтобы указать интенсивность
      </p>
    </div>

    <!-- Intensity Categories - Improved for small screens -->
    <div class="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
      <!-- Weak -->
      <div
        class="flex flex-col items-center justify-center min-h-[72px] p-2 md:p-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40"
      >
        <div class="text-green-400 font-medium text-sm md:text-base">
          <span class="hidden md:inline">Слабое</span>
          <span class="inline md:hidden">1-3</span>
        </div>
        <div class="text-[10px] md:text-xs text-green-300/80">
          <span class="inline md:hidden">Слабое</span>
          <span class="hidden md:inline">1-3</span>
        </div>
      </div>

      <!-- Medium -->
      <div
        class="flex flex-col items-center justify-center min-h-[72px] p-2 md:p-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40"
      >
        <div class="text-yellow-400 font-medium text-sm md:text-base">
          <span class="hidden md:inline">Умеренное</span>
          <span class="inline md:hidden">4-7</span>
        </div>
        <div class="text-[10px] md:text-xs text-yellow-300/80">
          <span class="inline md:hidden">Умеренное</span>
          <span class="hidden md:inline">4-7</span>
        </div>
      </div>

      <!-- Strong -->
      <div
        class="flex flex-col items-center justify-center min-h-[72px] p-2 md:p-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40"
      >
        <div class="text-red-400 font-medium text-sm md:text-base">
          <span class="hidden md:inline">Сильное</span>
          <span class="inline md:hidden">8-10</span>
        </div>
        <div class="text-[10px] md:text-xs text-red-300/80">
          <span class="inline md:hidden">Сильное</span>
          <span class="hidden md:inline">8-10</span>
        </div>
      </div>
    </div>

    <!-- Rest of the component remains the same -->
    <!-- Slider Container -->
    <div class="relative mt-6 md:mt-8 mb-4 md:mb-6 px-3">
      <div
        class="absolute w-full h-1.5 md:h-2 bg-gradient-to-r from-green-500/50 via-yellow-500/50 to-red-500/50 rounded-full"
      ></div>

      <input
        type="range"
        v-model="intensityLevel"
        min="1"
        max="10"
        class="relative w-full h-1.5 md:h-2 bg-transparent appearance-none cursor-pointer focus:outline-none rounded-lg"
        :style="sliderStyle"
      />

      <div class="relative w-full h-2 md:h-3 mt-1.5 md:mt-2">
        <template v-for="n in 10" :key="n">
          <div
            class="absolute h-2 md:h-3 w-px bg-[#0EA5E9]/30"
            :style="{
              left: `${((n - 1) / 9) * 100}%`,
              transform: 'translateX(-50%)',
            }"
          ></div>
        </template>
      </div>

      <div class="relative w-full h-4 mt-1">
        <template v-for="n in 10" :key="n">
          <span
            class="absolute text-[10px] md:text-xs transform -translate-x-1/2"
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

    <div class="text-center">
      <span
        class="inline-flex items-center px-4 md:px-6 py-1.5 md:py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 text-[#0EA5E9] text-xs md:text-sm font-medium"
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

const sliderStyle = computed(() => ({
  "--thumb-color": getThumbColor(intensityLevel.value),
}));

function getThumbColor(value) {
  if (value <= 3) return "rgb(74, 222, 128)";
  if (value <= 7) return "rgb(250, 204, 21)";
  return "rgb(248, 113, 113)";
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

/* Adjusted thumb positioning for mobile */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--thumb-color);
  cursor: pointer;
  /* Adjusted margin-top to center the thumb on the track */
  margin-top: -22px; /* (thumb height - track height) / 2 */
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--thumb-color);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

/* Desktop adjustments */
@media (min-width: 768px) {
  input[type="range"]::-webkit-slider-thumb {
    height: 24px;
    width: 24px;
    /* Adjusted margin-top for desktop size */
    margin-top: -20px; /* (thumb height - track height) / 2 */
    border: 3px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  }

  input[type="range"]::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border: 3px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  }
}

/* Hover states remain the same */
input[type="range"]::-webkit-slider-thumb:hover,
input[type="range"]::-webkit-slider-thumb:focus {
  transform: scale(1.15);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-moz-range-thumb:hover,
input[type="range"]::-moz-range-thumb:focus {
  transform: scale(1.15);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

@media (min-width: 768px) {
  input[type="range"]::-webkit-slider-thumb:hover,
  input[type="range"]::-webkit-slider-thumb:focus {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  }

  input[type="range"]::-moz-range-thumb:hover,
  input[type="range"]::-moz-range-thumb:focus {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  }
}
</style>
