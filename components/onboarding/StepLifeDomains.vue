<template>
  <div class="space-y-6">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Сферы жизни
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Выберите сферы, над которыми хотите поработать
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button v-for="domain in options" :key="domain" @click="toggleDomain(domain)"
        class="p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group"
        :class="[
          isSelected(domain)
            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 bg-white dark:bg-slate-800'
        ]">
        <span class="font-medium"
          :class="isSelected(domain) ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-700 dark:text-slate-300'">
          {{ domain }}
        </span>
        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
          :class="isSelected(domain) ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300 dark:border-slate-600'">
          <i v-if="isSelected(domain)" class="fas fa-check text-white text-xs"></i>
        </div>
      </button>
    </div>

    <div class="flex justify-between pt-6">
      <button @click="$emit('back')"
        class="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
        Назад
      </button>
      <button @click="$emit('next')" :disabled="modelValue.domains.length === 0"
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
  'Эмоции',
  'Отношения',
  'Работа и карьера',
  'Личностный рост',
  'Здоровье и тело',
  'Привычки и дисциплина',
  'Финансы',
  'Духовность',
  'Творчество',
  'Отдых и восстановление'
];

const isSelected = (domain) => props.modelValue.domains.includes(domain);

const toggleDomain = (domain) => {
  const currentDomains = [...props.modelValue.domains];
  const index = currentDomains.indexOf(domain);

  if (index === -1) {
    currentDomains.push(domain);
  } else {
    currentDomains.splice(index, 1);
  }

  emit('update:modelValue', {
    ...props.modelValue,
    domains: currentDomains
  });
};
</script>
