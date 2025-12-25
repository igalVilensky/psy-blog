<template>
  <div class="space-y-6">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Ваши ценности
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Что для вас сейчас наиболее значимо?
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <button v-for="value in options" :key="value" @click="toggleValue(value)"
        class="p-3 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 h-24"
        :class="[
          isSelected(value)
            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800'
        ]">
        <span class="font-medium text-sm"
          :class="isSelected(value) ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-700 dark:text-slate-300'">
          {{ value }}
        </span>
        <div v-if="isSelected(value)" class="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
          <i class="fas fa-check text-white text-[10px]"></i>
        </div>
      </button>
    </div>

    <div class="flex justify-between pt-6">
      <button @click="$emit('back')"
        class="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
        Назад
      </button>
      <button @click="$emit('next')" :disabled="modelValue.values.length === 0"
        class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
        Продолжить
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'next', 'back']);

const options = [
  'Здоровье',
  'Семья',
  'Свобода',
  'Развитие',
  'Уверенность',
  'Спокойствие',
  'Творчество',
  'Финансовая стабильность',
  'Любовь',
  'Осознанность',
  'Смысл',
  'Приключения',
  'Служение другим'
];

const isSelected = (value) => props.modelValue.values.includes(value);

const toggleValue = (value) => {
  const currentValues = [...props.modelValue.values];
  const index = currentValues.indexOf(value);

  if (index === -1) {
    currentValues.push(value);
  } else {
    currentValues.splice(index, 1);
  }

  emit('update:modelValue', {
    ...props.modelValue,
    values: currentValues
  });
};
</script>
