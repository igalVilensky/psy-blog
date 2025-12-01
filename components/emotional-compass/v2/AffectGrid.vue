<template>
  <div class="affect-grid-container select-none">
    <!-- Main Grid Area -->
    <div 
      ref="gridRef"
      class="relative w-full aspect-square max-w-[400px] mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 overflow-hidden cursor-crosshair touch-none"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
      @mousemove="onDrag"
      @touchmove.prevent="onDrag"
      @mouseup="stopDrag"
      @touchend="stopDrag"
      @mouseleave="stopDrag"
    >
      <!-- Background Gradients (Quadrants) -->
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

      <!-- Labels -->
      <div class="absolute inset-0 pointer-events-none text-xs font-mono text-slate-400 font-bold">
        <span class="absolute top-2 left-1/2 -translate-x-1/2">ВЫСОКАЯ ЭНЕРГИЯ</span>
        <span class="absolute bottom-2 left-1/2 -translate-x-1/2">НИЗКАЯ ЭНЕРГИЯ</span>
        <span class="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90">НЕПРИЯТНО</span>
        <span class="absolute right-2 top-1/2 -translate-y-1/2 rotate-90">ПРИЯТНО</span>
      </div>

      <!-- The Puck -->
      <div 
        class="absolute w-6 h-6 -ml-3 -mt-3 bg-white dark:bg-slate-900 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] border-2 border-cyan-500 z-10 transition-transform duration-75 ease-out flex items-center justify-center"
        :style="{ left: `${puckX}%`, top: `${puckY}%` }"
      >
        <div class="w-2 h-2 bg-cyan-500 rounded-full"></div>
      </div>
    </div>

    <!-- Values Display (Debug/Info) -->
    <div class="flex justify-between mt-4 text-xs font-mono text-slate-500">
      <div>ВАЛЕНТНОСТЬ: {{ valence.toFixed(2) }}</div>
      <div>ЭНЕРГИЯ: {{ arousal.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ valence: 0, arousal: 0 })
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const gridRef = ref(null);
const isDragging = ref(false);

// Internal state for smooth updates
const valence = ref(props.modelValue.valence || 0);
const arousal = ref(props.modelValue.arousal || 0);

// Convert valence/arousal (-1 to 1) to CSS percentages (0 to 100)
// Valence: -1 (0%) -> 1 (100%)
// Arousal: 1 (0%) -> -1 (100%)  <-- Note Y axis is inverted in CSS (0 is top)
const puckX = computed(() => ((valence.value + 1) / 2) * 100);
const puckY = computed(() => ((1 - arousal.value) / 2) * 100);

const updateCoordinates = (clientX, clientY) => {
  if (!gridRef.value) return;

  const rect = gridRef.value.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

  // Calculate normalized values
  // X: 0 -> -1, Width -> 1
  const rawValence = (x / rect.width) * 2 - 1;
  
  // Y: 0 -> 1, Height -> -1 (Inverted because CSS top=0 is high arousal in our UI?) 
  // Wait, UI label says Top = High Energy.
  // So Top (y=0) should be Arousal = 1.
  // Bottom (y=Height) should be Arousal = -1.
  // Formula: 1 - (y / height) * 2
  // y=0 => 1 - 0 = 1.
  // y=h => 1 - 2 = -1.
  const rawArousal = 1 - (y / rect.height) * 2;

  valence.value = Math.max(-1, Math.min(1, rawValence));
  arousal.value = Math.max(-1, Math.min(1, rawArousal));

  emit('update:modelValue', { valence: valence.value, arousal: arousal.value });
  emit('change', { valence: valence.value, arousal: arousal.value });
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

const stopDrag = () => {
  isDragging.value = false;
};

// Sync with external changes
watch(() => props.modelValue, (newVal) => {
  if (!isDragging.value) {
    valence.value = newVal.valence || 0;
    arousal.value = newVal.arousal || 0;
  }
}, { deep: true });
</script>
