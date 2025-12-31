<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div
      class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">

      <!-- Header -->
      <div
        class="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <i class="fas fa-brain text-purple-500 text-xl"></i>
            <h2 class="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">MINDQ LAB AI</h2>
          </div>
          <button @click="close"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Персонализированные рекомендации на основе вашего состояния
        </p>
      </div>

      <!-- Scrollable Body -->
      <div class="overflow-y-auto p-6 space-y-8">

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12 space-y-4">
          <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-slate-500 animate-pulse">Анализируем ваше состояние...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-8 text-red-500">
          <p>{{ error }}</p>
        </div>

        <!-- Results -->
        <div v-else-if="data" class="space-y-8">

          <!-- Quick Mode -->
          <div v-if="data.mode === 'quick'" class="text-center py-12 space-y-6">
            <div
              class="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto text-cyan-500">
              <i class="fas fa-check-circle text-4xl"></i>
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-slate-800 dark:text-white">Состояние сохранено!</h3>
              <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {{ data.message }}
              </p>
            </div>
          </div>

          <!-- Analysis Results (Standard/Deep) -->
          <template v-else>
            <!-- Analysis Summary -->
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-3 h-3 rounded-full" :class="getZoneColor(data.analysis.state)"></div>
                <h3 class="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide text-sm">
                  {{ data.analysis.state }}
                </h3>
              </div>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Эмоция: <span class="font-bold text-slate-800 dark:text-slate-200">{{ data.analysis.emotion }}</span>
                (Интенсивность: {{ data.analysis.intensity }}/10)
              </p>
            </div>

            <!-- Therapeutic Reflection -->
            <div class="space-y-4 animate-fadeIn">
              <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <i class="fas fa-spa text-purple-500"></i>
                Размышление и поддержка
              </h3>

              <div
                class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-lg">
                <div class="prose dark:prose-invert max-w-none">
                  <p v-for="(paragraph, index) in reflectionParagraphs" :key="index"
                    class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-serif text-lg italic whitespace-pre-wrap">
                    {{ paragraph }}
                  </p>
                </div>

                <div
                  class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-bold">
                    <i class="fas fa-shield-alt text-cyan-500"></i>
                    Безопасное пространство
                  </div>
                  <div class="text-xs text-slate-400 italic">
                    {{ data.shortSummary }}
                  </div>
                </div>
              </div>
            </div>
          </template>

        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
        <button @click="close"
          class="px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-all shadow-xl">
          Все понятно
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  error: String,
  data: Object
});

const emit = defineEmits(['close']);

const reflectionParagraphs = computed(() => {
  if (!props.data?.reflection) return [];
  return props.data.reflection.split('\n').filter(p => p.trim());
});

const close = () => {
  emit('close');
};

const getZoneColor = (stateName) => {
  if (stateName.includes('RED')) return 'bg-red-500';
  if (stateName.includes('BLUE')) return 'bg-blue-500';
  if (stateName.includes('GREEN')) return 'bg-green-500';
  if (stateName.includes('YELLOW')) return 'bg-yellow-500';
  return 'bg-slate-500';
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.prose p {
  margin-bottom: 1.5rem;
}
</style>
