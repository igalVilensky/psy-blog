<template>
  <div class="space-y-6">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Что для вас сейчас важнее всего?
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Выберите 2-3 основные цели
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        v-for="goal in options"
        :key="goal"
        @click="toggleGoal(goal)"
        class="p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group"
        :class="[
          isSelected(goal)
            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800'
        ]"
      >
        <span 
          class="font-medium"
          :class="isSelected(goal) ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-700 dark:text-slate-300'"
        >
          {{ goal }}
        </span>
        <div 
          class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
          :class="isSelected(goal) ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300 dark:border-slate-600'"
        >
          <i v-if="isSelected(goal)" class="fas fa-check text-white text-xs"></i>
        </div>
      </button>
    </div>

    <div class="flex justify-end pt-6">
      <button
        @click="$emit('next')"
        :disabled="modelValue.goals.length === 0"
        class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'next']);

const options = [
  'Управление стрессом',
  'Стабильность настроения',
  'Повышение энергии',
  'Борьба с тревогой',
  'Работа с эмоциями',
  'Улучшение фокуса и концентрации',
  'Самоценность и уверенность',
  'Улучшение отношений',
  'Преодоление прокрастинации',
  'Осознанность и присутствие',
  'Улучшение сна',
  'Личностный рост и самопознание'
];

const isSelected = (goal) => props.modelValue.goals.includes(goal);

const toggleGoal = (goal) => {
  const currentGoals = [...props.modelValue.goals];
  const index = currentGoals.indexOf(goal);

  if (index === -1) {
    if (currentGoals.length < 3) {
      currentGoals.push(goal);
    }
  } else {
    currentGoals.splice(index, 1);
  }

  emit('update:modelValue', {
    ...props.modelValue,
    goals: currentGoals
  });
};
</script>
