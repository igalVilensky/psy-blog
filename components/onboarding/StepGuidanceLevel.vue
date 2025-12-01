<template>
  <div class="space-y-8">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Формат работы
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Как вам удобнее двигаться к целям?
      </p>
    </div>

    <div class="space-y-4">
      <button
        v-for="level in options"
        :key="level.value"
        @click="selectLevel(level.value)"
        class="w-full p-6 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-4 group"
        :class="[
          isSelected(level.value)
            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800'
        ]"
      >
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors"
          :class="isSelected(level.value) ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
        >
          <i :class="['fas', level.icon, 'text-xl']"></i>
        </div>
        <div>
          <h3 
            class="font-bold text-lg mb-1"
            :class="isSelected(level.value) ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-900 dark:text-white'"
          >
            {{ level.label }}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">
            {{ level.description }}
          </p>
        </div>
      </button>
    </div>

    <div class="flex justify-between pt-6">
      <button
        @click="$emit('back')"
        class="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
      >
        Назад
      </button>
      <button
        @click="$emit('next')"
        :disabled="!modelValue.guidanceLevel"
        class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Завершить
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
  {
    value: 'Мягкое направление',
    label: 'Мягкое направление',
    description: 'Свободный темп, рекомендации по настроению, минимум обязательств.',
    icon: 'fa-feather'
  },
  {
    value: 'Гибридный формат',
    label: 'Гибридный формат',
    description: 'Баланс структуры и свободы. Основные вехи намечены, но путь выбираете вы.',
    icon: 'fa-balance-scale'
  },
  {
    value: 'Чёткие шаги',
    label: 'Чёткие шаги',
    description: 'Конкретный план действий, расписание и регулярные задания.',
    icon: 'fa-list-check'
  }
];

const isSelected = (val) => props.modelValue.guidanceLevel === val;

const selectLevel = (val) => {
  emit('update:modelValue', {
    ...props.modelValue,
    guidanceLevel: val
  });
};
</script>
