<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" @click="close"></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
      
      <!-- Header -->
      <div class="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <i class="fas fa-brain text-purple-500 text-xl"></i>
            <h2 class="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">MINDQ LAB AI</h2>
          </div>
          <button @click="close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
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

          <!-- Primary Recommendation -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <i class="fas fa-star text-yellow-400"></i>
              Рекомендуемая практика
            </h3>
            
            <div class="bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl p-1 shadow-lg">
              <div class="bg-white dark:bg-slate-900 rounded-xl p-6 h-full">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h4 class="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                      {{ data.primary.title }}
                    </h4>
                    <div class="flex gap-2 text-xs">
                      <span class="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {{ data.primary.duration }}
                      </span>
                      <span class="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {{ data.primary.type }}
                      </span>
                    </div>
                  </div>
                  <div class="text-cyan-500 font-bold text-xl">
                    {{ data.primary.matchScore }}%
                  </div>
                </div>
                
                <p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {{ data.primary.reasoning }}
                </p>

                <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700">
                  <h5 class="text-xs font-bold text-slate-400 uppercase mb-3">МИНИ-РУТИНА</h5>
                  <ul class="space-y-3">
                    <li v-for="step in data.routine" :key="step.step" class="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span class="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                        {{ step.step }}
                      </span>
                      <span>{{ step.action }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Recommendations -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
              Альтернативы
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="tool in data.secondary" 
                :key="tool.id"
                class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-400 transition-colors bg-white dark:bg-slate-800/30"
              >
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-slate-700 dark:text-slate-200">{{ tool.title }}</h4>
                  <span class="text-xs font-mono text-slate-400">{{ tool.matchScore }}%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
        <button 
          @click="close"
          class="px-6 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          Закрыть
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
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
