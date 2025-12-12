<!-- pages/lab/brain-training/index.vue -->
<template>
  <div class="brain-training-page min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Breadcrumbs placeholder if needed, or back link -->
      
      <!-- Page Header -->
      <div class="mb-4">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          Тренировка Мозга
        </h1>
        <p class="text-slate-600 dark:text-cyan-300/70 text-sm sm:text-base leading-relaxed max-w-2xl">
          Комплексная система развития когнитивных способностей: игры, упражнения и ментальные модели.
        </p>
      </div>

      <!-- Main Navigation Tabs -->
      <div class="flex flex-wrap gap-2 sm:gap-4 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 sm:px-6 sm:py-3 rounded-t-xl font-medium text-sm sm:text-base transition-all relative"
          :class="activeTab === tab.id 
            ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900 border-x border-t border-slate-200 dark:border-slate-800 -mb-[1px] shadow-sm' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'"
        >
          <div class="flex items-center gap-2">
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </div>
          <!-- Active Indicator Line (if not using card style) -->
           <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 dark:bg-cyan-400 lg:hidden"></div>
        </button>
      </div>

      <!-- Content Area -->
      <div class="bg-white dark:bg-slate-900/30 rounded-b-2xl rounded-tr-2xl min-h-[500px] border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
        <Transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="currentView" @switch-tab="switchTab" />
          </KeepAlive>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GamesView from '~/components/lab/brain-training/GamesView.vue';
import ExercisesView from '~/components/lab/brain-training/ExercisesView.vue';
import ModelsView from '~/components/lab/brain-training/ModelsView.vue';

definePageMeta({
  layout: "laboratory",
});

useHead({
  title: "Тренировка Мозга",
  meta: [
    {
      name: "description",
      content: "Комплексная система развития когнитивных способностей: игры, упражнения и ментальные модели.",
    },
     {
      property: "og:title",
      content: "Тренировка Мозга | MindQ Lab",
    },
    {
      property: "og:description",
      content: "Развивайте память, внимание и мышление с помощью игр, упражнений и ментальных моделей.",
    },
  ],
});

const activeTab = ref('games');

const tabs = [
  { id: 'games', label: 'Игры', icon: 'fas fa-gamepad' },
  { id: 'exercises', label: 'Упражнения', icon: 'fas fa-dumbbell' },
  { id: 'models', label: 'Когнитивные Модели', icon: 'fas fa-brain' },
];

const currentView = computed(() => {
  switch (activeTab.value) {
    case 'games': return GamesView;
    case 'exercises': return ExercisesView;
    case 'models': return ModelsView;
    default: return GamesView;
  }
});

const switchTab = (tabId) => {
  if (tabs.some(t => t.id === tabId)) {
    activeTab.value = tabId;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
