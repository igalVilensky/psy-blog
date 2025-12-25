<template>
  <div class="emotion-selector w-full max-w-2xl mx-auto">
    <!-- Family Selection Phase -->
    <div v-if="!selectedFamily" class="animate-fadeIn">
      <h3 class="text-lg font-mono text-slate-500 dark:text-slate-400 mb-4 text-center">
        ВЫБЕРИТЕ ГРУППУ ЭМОЦИЙ
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button v-for="family in quadrantFamilies" :key="family.id" @click="selectFamily(family)"
          class="relative group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] text-left overflow-hidden"
          :class="[
            'bg-white dark:bg-slate-900',
            'border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 shadow-md hover:shadow-xl'
          ]">
          <div class="relative z-10">
            <div
              class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {{ family.name }}
            </div>
            <div class="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
              {{ family.nuances.length }} оттенков
            </div>
          </div>

          <!-- Hover Gradient -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-cyan-500 to-purple-500 transition-opacity duration-300">
          </div>
        </button>
      </div>
    </div>

    <!-- Nuance Selection Phase -->
    <div v-else class="animate-fadeIn">
      <div class="flex items-center justify-between mb-6">
        <button @click="selectedFamily = null"
          class="text-sm text-slate-400 hover:text-cyan-500 flex items-center gap-2 transition-colors">
          <i class="fas fa-arrow-left"></i> НАЗАД К ГРУППАМ
        </button>
        <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
          {{ selectedFamily.name.toUpperCase() }}
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button v-for="nuance in selectedFamily.nuances" :key="nuance.id" @click="selectNuance(nuance)"
          class="p-4 rounded-lg border transition-all duration-200 text-center relative overflow-hidden" :class="[
            modelValue?.id === nuance.id
              ? 'bg-cyan-600 text-white border-cyan-700 shadow-xl scale-105 ring-2 ring-cyan-400/50'
              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-lg font-semibold'
          ]">
          <span class="relative z-10 font-medium">{{ nuance.name }}</span>

          <!-- Intensity Indicator -->
          <div class="absolute bottom-0 left-0 h-2 transition-all opacity-60"
            :class="modelValue?.id === nuance.id ? 'bg-white' : 'bg-slate-200 dark:bg-slate-700'"
            :style="{ width: `${nuance.intensity * 10}%` }" :title="`Интенсивность: ${nuance.intensity}/10`"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { emotionalQuadrants } from '~/data/emotionalBarometer/emotions';

const props = defineProps({
  quadrantId: {
    type: String,
    default: 'red'
  },
  modelValue: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'select']);

const selectedFamily = ref(null);

const activeQuadrant = computed(() => {
  return emotionalQuadrants.find(q => q.id === props.quadrantId);
});

const quadrantFamilies = computed(() => {
  return activeQuadrant.value?.families || [];
});

const selectFamily = (family) => {
  selectedFamily.value = family;
};

const selectNuance = (nuance) => {
  const selection = {
    primary: selectedFamily.value.name,
    secondary: nuance.name,
    ...nuance
  };
  emit('update:modelValue', selection);
  emit('select', selection);
};

// Reset family selection if quadrant changes
watch(() => props.quadrantId, () => {
  selectedFamily.value = null;
});
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
