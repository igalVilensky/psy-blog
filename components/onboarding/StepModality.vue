<template>
  <div class="space-y-6">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Какие форматы вам ближе?
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Выберите все, что вам интересно
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button v-for="modality in options" :key="modality" @click="toggleModality(modality)"
        class="p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group"
        :class="[
          isSelected(modality)
            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800'
        ]">
        <span class="font-medium"
          :class="isSelected(modality) ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-700 dark:text-slate-300'">
          {{ modality }}
        </span>
        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
          :class="isSelected(modality) ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300 dark:border-slate-600'">
          <i v-if="isSelected(modality)" class="fas fa-check text-white text-xs"></i>
        </div>
      </button>
    </div>

    <div class="flex justify-between pt-6">
      <button @click="$emit('back')"
        class="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
        Назад
      </button>
      <button @click="$emit('next')" :disabled="modelValue.modalities.length === 0"
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
  'Медитации',
  'Дыхательные практики',
  'Когнитивные упражнения',
  'Телесные упражнения / соматика',
  'Игры и мини-тренировки',
  'Дневниковые практики',
  'Визуализации',
  'Карты вопросов',
  'Короткие техники (1–2 минуты)',
  'Длинные структурированные сессии'
];

const isSelected = (modality) => props.modelValue.modalities.includes(modality);

const toggleModality = (modality) => {
  const currentModalities = [...props.modelValue.modalities];
  const index = currentModalities.indexOf(modality);

  if (index === -1) {
    currentModalities.push(modality);
  } else {
    currentModalities.splice(index, 1);
  }

  emit('update:modelValue', {
    ...props.modelValue,
    modalities: currentModalities
  });
};
</script>
