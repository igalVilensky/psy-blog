<template>
  <div class="space-y-8">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Ваш стиль
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Выберите утверждение, которое вам ближе
      </p>
    </div>

    <div class="space-y-6">
      <!-- Pair 1: Thinking -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Мышление</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="option in pairs.thinking"
            :key="option"
            @click="selectOption('thinking', option)"
            class="p-4 rounded-xl border-2 text-center transition-all duration-200"
            :class="[
              isSelected('thinking', option)
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-medium'
                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Pair 2: Emotional Processing -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Эмоции</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="option in pairs.processing"
            :key="option"
            @click="selectOption('processing', option)"
            class="p-4 rounded-xl border-2 text-center transition-all duration-200"
            :class="[
              isSelected('processing', option)
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-medium'
                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Pair 3: Structure Preference -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Структура</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="option in pairs.structure"
            :key="option"
            @click="selectOption('structure', option)"
            class="p-4 rounded-xl border-2 text-center transition-all duration-200"
            :class="[
              isSelected('structure', option)
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-medium'
                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Pair 4: Tone Preference -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Тон</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="option in pairs.tone"
            :key="option"
            @click="selectOption('tone', option)"
            class="p-4 rounded-xl border-2 text-center transition-all duration-200"
            :class="[
              isSelected('tone', option)
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-medium'
                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>
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
        :disabled="!isComplete"
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

const emit = defineEmits(['update:modelValue', 'next', 'back']);

const pairs = {
  thinking: ['Рациональный, логический', 'Интуитивный, чувствующий'],
  processing: ['Сначала анализирую', 'Сначала чувствую'],
  structure: ['Нужен чёткий план', 'Предпочитаю гибкость'],
  tone: ['Мягкий, спокойный тон', 'Прямой, чёткий тон']
};

const isSelected = (category, option) => props.modelValue.persona[category] === option;

const selectOption = (category, option) => {
  emit('update:modelValue', {
    ...props.modelValue,
    persona: {
      ...props.modelValue.persona,
      [category]: option
    }
  });
};

const isComplete = computed(() => {
  const p = props.modelValue.persona;
  return p.thinking && p.processing && p.structure && p.tone;
});
</script>
