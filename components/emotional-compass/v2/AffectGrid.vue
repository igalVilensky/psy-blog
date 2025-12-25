<template>
  <div class="affect-grid-container select-none">
    <!-- Step Title -->
    <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
      Ваше состояние
    </h2>
    <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
      Отметьте точку, которая лучше всего описывает ваше самочувствие прямо сейчас.
    </p>

    <!-- Main Grid Area -->
    <div ref="gridRef"
      class="relative w-full aspect-square max-w-[400px] mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 overflow-hidden cursor-crosshair touch-none"
      @mousedown="startDrag" @touchstart.prevent="startDrag" @mousemove="onDrag" @touchmove.prevent="onDrag"
      @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
      <!-- Background Quadrants -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/20"></div> <!-- High Energy / Unpleasant -->
        <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-500/20"></div> <!-- High Energy / Pleasant -->
        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/20"></div> <!-- Low Energy / Unpleasant -->
        <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-500/20"></div> <!-- Low Energy / Pleasant -->
      </div>

      <!-- Grid Lines -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Center Axes -->
        <div class="absolute top-0 bottom-0 left-1/2 w-px bg-slate-300 dark:bg-slate-600"></div>
        <div class="absolute left-0 right-0 top-1/2 h-px bg-slate-300 dark:bg-slate-600"></div>
        <!-- Grid Pattern -->
        <div class="w-full h-full opacity-10"
          style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 20px 20px;">
        </div>
      </div>

      <!-- Axis Labels -->
      <div class="absolute inset-0 pointer-events-none text-xs font-medium text-slate-500 dark:text-slate-400">
        <span class="absolute top-2 left-1/2 -translate-x-1/2">Много энергии</span>
        <span class="absolute bottom-2 left-1/2 -translate-x-1/2">Мало энергии</span>
        <span class="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90">Неприятно</span>
        <span class="absolute right-2 top-1/2 -translate-y-1/2 rotate-90">Приятно</span>
      </div>

      <!-- Draggable Puck -->
      <div
        class="absolute w-6 h-6 -ml-3 -mt-3 bg-white dark:bg-slate-900 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] border-2 border-cyan-500 z-10 transition-transform duration-75 ease-out flex items-center justify-center"
        :style="{ left: `${puckX}%`, top: `${puckY}%` }">
        <div class="w-2 h-2 bg-cyan-500 rounded-full"></div>
      </div>
    </div>

    <!-- Live Values Display -->
    <div class="flex justify-between mt-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
      <div>Приятность: {{ pleasantnessPercent.toUpperCase() }}%</div>
      <div>Активность: {{ activityPercent.toUpperCase() }}%</div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ valence: 0, arousal: 0 })
  }
});
const emit = defineEmits(['update:modelValue', 'change']);

const gridRef = ref(null);
const isDragging = ref(false);

const valence = ref(props.modelValue.valence || 0);
const arousal = ref(props.modelValue.arousal || 0);

const puckX = computed(() => ((valence.value + 1) / 2) * 100);
const puckY = computed(() => ((1 - arousal.value) / 2) * 100);

const pleasantnessPercent = computed(() => {
  const v = Number(valence.value);
  return isNaN(v) ? 50 : ((v + 1) / 2 * 100).toFixed(0);
});

const activityPercent = computed(() => {
  const a = Number(arousal.value);
  return isNaN(a) ? 50 : ((a + 1) / 2 * 100).toFixed(0);
});


const updateCoordinates = (clientX, clientY) => {
  if (!gridRef.value) return;
  const rect = gridRef.value.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

  valence.value = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
  arousal.value = Math.max(-1, Math.min(1, 1 - (y / rect.height) * 2));

  // Calculate intensity (Vector Magnitude from center), scaled 0-10
  // Max distance is sqrt(1^2 + 1^2) = sqrt(2) ≈ 1.414
  const magnitude = Math.sqrt(Math.pow(valence.value, 2) + Math.pow(arousal.value, 2));
  // Normalize to 0-1 (divide by sqrt(2)) then scale to 0-10
  const intensity = Math.min(10, Math.round((magnitude / 1.414) * 10));

  emit('update:modelValue', { valence: valence.value, arousal: arousal.value, intensity });
  emit('change', { valence: valence.value, arousal: arousal.value, intensity });
};

// Calculate initial intensity on mount/update
const calculateIntensity = () => {
  const magnitude = Math.sqrt(Math.pow(valence.value, 2) + Math.pow(arousal.value, 2));
  return Math.min(10, Math.round((magnitude / 1.414) * 10));
};

const startDrag = (e) => {
  isDragging.value = true;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  updateCoordinates(clientX, clientY);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  updateCoordinates(clientX, clientY);
};

const stopDrag = () => { isDragging.value = false; };

watch(() => props.modelValue, (newVal) => {
  if (!isDragging.value) {
    valence.value = newVal.valence || 0;
    arousal.value = newVal.arousal || 0;
    // Ensure intensity is up to date if passed, otherwise calculate
    if (newVal.intensity === undefined) {
      const intensity = calculateIntensity();
      emit('update:modelValue', { ...newVal, intensity });
    }
  }
}, { deep: true, immediate: true });
</script>
