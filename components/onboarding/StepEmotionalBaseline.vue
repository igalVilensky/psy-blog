<template>
  <div class="space-y-8">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Ваше текущее состояние
      </h2>
      <p class="text-slate-600 dark:text-slate-400">
        Оцените по шкале от 0 до 10
      </p>
    </div>

    <div class="space-y-8 px-4">
      <!-- Stress Slider -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="font-medium text-slate-700 dark:text-slate-300">Уровень стресса</label>
          <span class="text-cyan-600 dark:text-cyan-400 font-bold text-lg">{{ modelValue.emotionalBaseline.stress }}</span>
        </div>
        <input 
          type="range" 
          v-model.number="localStress"
          min="0" 
          max="10" 
          step="1"
          class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          @input="updateBaseline('stress', localStress)"
        >
        <div class="flex justify-between text-xs text-slate-500">
          <span>Низкий</span>
          <span>Высокий</span>
        </div>
      </div>

      <!-- Energy Slider -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="font-medium text-slate-700 dark:text-slate-300">Уровень энергии</label>
          <span class="text-cyan-600 dark:text-cyan-400 font-bold text-lg">{{ modelValue.emotionalBaseline.energy }}</span>
        </div>
        <input 
          type="range" 
          v-model.number="localEnergy"
          min="0" 
          max="10" 
          step="1"
          class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          @input="updateBaseline('energy', localEnergy)"
        >
        <div class="flex justify-between text-xs text-slate-500">
          <span>Истощен</span>
          <span>Заряжен</span>
        </div>
      </div>

      <!-- Stability Slider -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="font-medium text-slate-700 dark:text-slate-300">Эмоциональная стабильность</label>
          <span class="text-cyan-600 dark:text-cyan-400 font-bold text-lg">{{ modelValue.emotionalBaseline.stability }}</span>
        </div>
        <input 
          type="range" 
          v-model.number="localStability"
          min="0" 
          max="10" 
          step="1"
          class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          @input="updateBaseline('stability', localStability)"
        >
        <div class="flex justify-between text-xs text-slate-500">
          <span>Качели</span>
          <span>Дзен</span>
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
        class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'next', 'back']);

const localStress = ref(props.modelValue.emotionalBaseline.stress);
const localEnergy = ref(props.modelValue.emotionalBaseline.energy);
const localStability = ref(props.modelValue.emotionalBaseline.stability);

const updateBaseline = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    emotionalBaseline: {
      ...props.modelValue.emotionalBaseline,
      [field]: value
    }
  });
};
</script>
