<template>
  <div class="context-selector">
    <div class="space-y-6">
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Выберите факторы, которые могли повлиять на ваше состояние. Это поможет ИИ найти закономерности и дать более
        точные рекомендации.
      </p>
      <div v-for="category in categories" :key="category.id">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">
          {{ category.label }}
        </h4>
        <div class="flex flex-wrap gap-2">
          <button v-for="tag in category.tags" :key="tag" @click="toggleTag(tag)"
            class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 border" :class="[
              isSelected(tag)
                ? 'bg-cyan-500 text-white border-cyan-600 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700'
            ]">
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Custom Tag Input -->
      <div class="relative mt-4">
        <input v-model="customTag" @keydown.enter="addCustomTag" type="text" placeholder="Добавить свой вариант..."
          class="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm" />
        <button @click="addCustomTag"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-600"
          :disabled="!customTag.trim()">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const customTag = ref('');

const categories = [
  {
    id: 'life',
    label: 'Сферы жизни',
    tags: ['Работа', 'Семья', 'Отношения', 'Здоровье', 'Финансы', 'Учеба']
  },
  {
    id: 'internal',
    label: 'Внутреннее состояние',
    tags: ['Усталость', 'Голод', 'Боль', 'Мысли', 'Воспоминания', 'Сны']
  },
  {
    id: 'environment',
    label: 'Окружение',
    tags: ['Шум', 'Толпа', 'Погода', 'Дом', 'Транспорт', 'Соцсети']
  }
];

const isSelected = (tag) => props.modelValue.includes(tag);

const toggleTag = (tag) => {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(tag);

  if (index === -1) {
    newValue.push(tag);
  } else {
    newValue.splice(index, 1);
  }

  emit('update:modelValue', newValue);
};

const addCustomTag = () => {
  const tag = customTag.value.trim();
  if (tag && !props.modelValue.includes(tag)) {
    const newValue = [...props.modelValue, tag];
    emit('update:modelValue', newValue);
    customTag.value = '';
  }
};
</script>
