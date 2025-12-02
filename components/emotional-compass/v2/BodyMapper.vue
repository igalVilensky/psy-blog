<template>
  <div class="body-mapper w-full max-w-md mx-auto">
    <div class="relative aspect-[3/4] bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
      <h3 class="absolute top-4 left-0 right-0 text-center text-sm font-mono text-slate-400 pointer-events-none">
        ТЕЛЕСНЫЕ ОЩУЩЕНИЯ
      </h3>
      
      <svg viewBox="0 0 200 400" class="w-full h-full drop-shadow-xl">
        <!-- Head -->
        <path
          d="M100 20 C 80 20, 70 40, 70 60 C 70 85, 85 95, 100 95 C 115 95, 130 85, 130 60 C 130 40, 120 20, 100 20 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('head') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('head')"
        />
        
        <!-- Throat -->
        <path
          d="M85 95 Q 100 105, 115 95 L 115 110 Q 100 115, 85 110 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('throat') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('throat')"
        />

        <!-- Chest -->
        <path
          d="M70 110 Q 100 120, 130 110 L 140 180 Q 100 190, 60 180 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('chest') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('chest')"
        />

        <!-- Stomach/Gut -->
        <path
          d="M60 180 Q 100 190, 140 180 L 135 240 Q 100 250, 65 240 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('stomach') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('stomach')"
        />

        <!-- Arms (Left & Right merged for simplicity or separate) -->
        <path
          d="M70 110 L 40 180 L 55 190 L 80 120 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('arms') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('arms')"
        />
        <path
          d="M130 110 L 160 180 L 145 190 L 120 120 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('arms') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('arms')"
        />

        <!-- Legs -->
        <path
          d="M65 240 L 60 380 L 95 380 L 98 245 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('legs') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('legs')"
        />
        <path
          d="M135 240 L 140 380 L 105 380 L 102 245 Z"
          class="body-part transition-colors duration-300 cursor-pointer hover:opacity-80"
          :class="isSelected('legs') ? 'fill-cyan-500 stroke-cyan-600' : 'fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600'"
          @click="togglePart('legs')"
        />
      </svg>

      <!-- Legend/Help -->
      <div class="mt-4 flex flex-wrap gap-2 justify-center">
        <span 
          v-for="part in modelValue" 
          :key="part"
          class="px-2 py-1 text-xs rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800"
        >
          {{ getBodyPartName(part).toUpperCase() }}
        </span>
        <span v-if="modelValue.length === 0" class="text-xs text-slate-400 italic">
          Нажмите на области, где чувствуете ощущения
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const isSelected = (part) => props.modelValue.includes(part);

const togglePart = (part) => {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(part);
  
  if (index === -1) {
    newValue.push(part);
  } else {
    newValue.splice(index, 1);
  }
  
  emit('update:modelValue', newValue);
};

const getBodyPartName = (part) => {
  const names = {
    head: 'Голова',
    throat: 'Горло',
    chest: 'Грудь',
    stomach: 'Живот',
    arms: 'Руки',
    legs: 'Ноги'
  };
  return names[part] || part;
};
</script>

<style scoped>
.body-part {
  stroke-width: 2;
}
</style>
