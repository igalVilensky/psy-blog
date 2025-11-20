<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-12 text-center">
      <div class="text-6xl font-mono font-bold mb-4 transition-colors duration-300"
           :class="intensityColor">
        {{ intensityLevel }}
      </div>
      <p class="text-slate-400 text-lg">{{ intensityDescription }}</p>
    </div>

    <div class="relative h-16 flex items-center">
      <!-- Track -->
      <div class="absolute w-full h-4 bg-slate-800 rounded-full overflow-hidden">
        <div
          class="h-full transition-all duration-300"
          :class="trackGradient"
          :style="{ width: `${((intensityLevel - 1) / 9) * 100}%` }"
        ></div>
      </div>

      <!-- Slider Input -->
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        :value="intensityLevel"
        @input="$emit('update:intensityLevel', Number($event.target.value))"
        class="absolute w-full h-full opacity-0 cursor-pointer z-20"
      />

      <!-- Thumb (Visual only, follows input) -->
      <div
        class="absolute h-8 w-8 bg-white rounded-full shadow-lg border-4 transition-all duration-100 pointer-events-none z-10"
        :class="thumbBorderColor"
        :style="{ left: `calc(${((intensityLevel - 1) / 9) * 100}%)`, transform: 'translateX(-50%)' }"
      ></div>
      
      <!-- Ticks -->
      <div class="absolute w-full flex justify-between px-1 pointer-events-none mt-12">
        <span v-for="n in 10" :key="n" class="text-xs font-mono text-slate-600">{{ n }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  selectedEmotion: {
    type: Object,
    required: true,
  },
  intensityLevel: {
    type: Number,
    required: true,
  },
});

defineEmits(["update:intensityLevel"]);

const intensityColor = computed(() => {
  if (props.intensityLevel <= 3) return "text-emerald-400";
  if (props.intensityLevel <= 7) return "text-yellow-400";
  return "text-red-400";
});

const trackGradient = computed(() => {
  if (props.intensityLevel <= 3) return "bg-gradient-to-r from-emerald-500/20 to-emerald-500";
  if (props.intensityLevel <= 7) return "bg-gradient-to-r from-emerald-500 to-yellow-500";
  return "bg-gradient-to-r from-yellow-500 to-red-500";
});

const thumbBorderColor = computed(() => {
  if (props.intensityLevel <= 3) return "border-emerald-500";
  if (props.intensityLevel <= 7) return "border-yellow-500";
  return "border-red-500";
});

const intensityDescription = computed(() => {
  const descriptions = {
    1: "Едва заметно",
    2: "Очень слабо",
    3: "Слабо",
    4: "Умеренно",
    5: "Средне",
    6: "Ощутимо",
    7: "Сильно",
    8: "Очень сильно",
    9: "Интенсивно",
    10: "Максимально",
  };
  return descriptions[props.intensityLevel] || "";
});
</script>
